import { Component } from "solid-js";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

const ProductoDetails: Component<{ producto: Producto }> = (props) => {
  return (
    <div>
      <h2>Detalles del Producto</h2>
      <p>Nombre: {props.producto.nombre}</p>
      <p>Descripción: {props.producto.descripcion}</p>
      <p>Precio: ${props.producto.precio}</p>
    </div>
  );
};

export default ProductoDetails;