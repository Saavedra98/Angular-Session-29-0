import { Component, Inject, OnInit } from '@angular/core';


import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Producto } from 'src/app/interface/producto';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Precio', 'Borrar?']; 
  productos!: Producto[]; 
  constructor(public dialog: MatDialog, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto() {
    this.productoService.getProducto().subscribe(productos => {
      this.productos = productos; 
      this.dataSource = new ExampleDataSource(this.productos);

    });
  }

  dataSource = new ExampleDataSource(this.productos);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewProducto)

    dialogRef.afterClosed().subscribe(result => {
      this.getProducto()
      this.dataSource.setData(result);
    });
  }

  removeData(producto: Producto) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.value) {
        this.productoService.deleteProducto(producto);
        Swal.fire(
          'Producto Eliminado',
          'El producto ha sido eliminado de la Base de Datos.',
          'success'
        )
      }
    });
  }

}

class ExampleDataSource extends DataSource<Producto> {
  private _dataStream = new ReplaySubject<Producto[]>();

  constructor(initialData: Producto[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Producto[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: Producto[]) {
    this._dataStream.next(data);
  }
}


@Component({
  selector: 'dialog-overview-producto',
  templateUrl: './agregar.html',
  styleUrls: ['./home.component.css']
})
export class DialogOverviewProducto implements OnInit {
  codigo!: string;
  descripcion!: string;
  precio!: number;
  public formRegistro !: FormGroup;

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.formRegistro = this.formBuilder.group({
      codigo: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      precio: ['', [
        Validators.required,
      ]]
    })
  }

  registrar() {

    if (this.formRegistro.valid) {
      this.productoService.addProducto(this.formRegistro.value)
        .then(() => {
          Swal.fire(
            'Producto Registrado ',
            'El producto se ha agregado a la Base de Datos.',
            'success'
          );
          this.dialogRef.close(this.formRegistro.value);
        })
        .catch(error => {
          Swal.fire(
            'Error!',
            'Ha ocurrido un error al agregar el producto.',
            'error'
          );
        });
    } else {
      Swal.fire(
        'Error!',
        'Datos incorrectos ingresados',
        'error'
      );
    }


  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}