const Producto = require("../models/Producto");

exports.crearProducto = async (req,res) => {
    try {
        let producto;
        producto = new Producto(req.body);
        await producto.save()
        res.send(producto);
    }catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) =>
{
    try
    {
        const productos = await Producto.find();
        res.json(productos);
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProducto = async (req, res) =>
{
    try
    {
        const { producto, categoria, ubicacion, precio } = req.body;
        let productoBD = await Producto.findById(req.params.id);

        if(!productoBD)
        {
            res.status(404).json({msg: 'No existe el producto'})
        }
        else
        {
            productoBD.producto = producto;
            productoBD.categoria = categoria;
            productoBD.ubicacion = ubicacion;
            productoBD.precio = precio;

            productoBD = await Producto.findOneAndUpdate({_id: req.params.id}, productoBD, {new: true})

            res.json(productoBD);
        }
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProducto = async (req, res) =>
{
    try
    {
        let productoBD = await Producto.findById(req.params.id);

        if(!productoBD)
        {
            res.status(404).json({msg: 'No existe el producto'})
        }
        else
        {
            res.json(productoBD);
        }
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) =>
{
    try
    {
        let productoBD = await Producto.findById(req.params.id);

        if(!productoBD)
        {
            res.status(404).json({msg: 'No existe el producto'})
        }
        else
        {
            await Producto.findOneAndRemove({_id: req.params.id});
            res.json({ msg: 'Producto eliminado con exito' })
        }
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

