import { Component, OnInit } from '@angular/core';
import { ProductoService } from "../../services/producto.service";
import { Producto } from "../../models/producto";
import { ToastrService } from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
    selector: 'app-listar-productos',
    templateUrl: './listar-productos.component.html',
    styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit
{
    listProductos: Producto[] =[];

    constructor(private productoService: ProductoService, private toast: ToastrService, private router: Router) {}

    ngOnInit(): void {
        this.obtenerProductos()
    }


    obtenerProductos()
    {
        this.productoService.getProductos().subscribe( data =>{
            console.log(data);
            this.listProductos = data;
        }, error => {
            console.log(error);
        })
    }

    eliminarProducto(_id: any)
    {
        this.productoService.eliminarProducto(_id).subscribe( data =>{
            this.toast.success('El producto fue eliminado con exito', 'Producto eliminado');
            this.obtenerProductos;
            window.location.reload();
        }, error => {
            this.toast.error('El producto no se eliminó', 'Error: ' + error);

        })
    }
}
