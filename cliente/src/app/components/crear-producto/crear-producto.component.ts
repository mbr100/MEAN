import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from "../../models/producto";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProductoService } from "../../services/producto.service";

@Component({
    selector: 'app-crear-producto',
    templateUrl: './crear-producto.component.html',
    styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit
{
    productoForm: FormGroup;
    titulo = 'Crear producto';
    id: string|null;

    constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private productoService: ProductoService,
                private aRouter: ActivatedRoute)
    {
        this.productoForm = this.fb.group({
            producto:['', Validators.required],
            categoria:['', Validators.required],
            ubicacion:['', Validators.required],
            precio:['', Validators.required],
        });
        this.id = this.aRouter.snapshot.paramMap.get('id');
        this.esEditar();
    }

    ngOnInit(): void {
    }

    agregarProducto()
    {
        const Producto: Producto = {
            producto: this.productoForm.get('producto')?.value,
            categoria: this.productoForm.get('categoria')?.value,
            ubicacion: this.productoForm.get('ubicacion')?.value,
            precio: this.productoForm.get('precio')?.value,
        }
        if (this.id !== null)
        {
            this.productoService.editarProducto(this.id,Producto).subscribe( data => {
                this.toastr.info('El producto se actualizado con exito', 'Producto actualizado');
                this.router.navigate(['/']);
            }, error => {
                console.log(error);
                this.productoForm.reset();
            })
        }
        else
        {
            this.productoService.guardarProducto(Producto).subscribe( data => {
                this.toastr.success('El producto fue registrado con éxito!', 'Producto registrado!!!');
                this.router.navigate(['/']);
            }, error => {
                console.log(error);
                this.productoForm.reset();
            })
        }
    }

    esEditar()
    {
        if (this.id != null)
        {
            this.titulo = 'Editar Producto';
            this.productoService.obtenerProducto(this.id).subscribe( data => {
                this.productoForm.setValue({
                    producto: data.producto,
                    categoria: data.categoria,
                    ubicacion: data.ubicacion,
                    precio: data.precio,
                })
            })
        }
    }
}
