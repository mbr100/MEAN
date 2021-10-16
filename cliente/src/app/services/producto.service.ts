import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Producto } from "../models/producto";

@Injectable({
    providedIn: 'root'
})
export class ProductoService
{
    //URL de la API
    url = 'http://localhost:4000/api/productos/';

    constructor( private http: HttpClient) {}

    getProductos(): Observable<any>
    {
        return this.http.get(this.url);
    }

    eliminarProducto(id: String): Observable<any>
    {
        return this.http.delete(this.url+id);
    }

    guardarProducto(producto: Producto): Observable<any>
    {
        return this.http.post(this.url, producto);
    }

    obtenerProducto(id: string): Observable<any>
    {
        return this.http.get(this.url+id);
    }

    editarProducto(id: String, producto: Producto): Observable<any>
    {
        return this.http.put(this.url+id, producto);
    }
}
