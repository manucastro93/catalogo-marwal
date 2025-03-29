import { Component } from "solid-js";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

interface ProductoListProps {
  productos: Producto[];
  onSelectProducto: (producto: Producto) => void;
}

const ProductoList: Component<ProductoListProps> = (props) => {
  return (
    <ul>
      {props.productos.map((producto) => (
        <li onClick={() => props.onSelectProducto(producto)}>
          {producto.nombre} - ${producto.precio}
        </li>
      ))}
    </ul>
  );
};

export default ProductoList;