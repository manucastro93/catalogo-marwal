import { Component } from "solid-js";

const PedidoDetails: Component<{ pedido: any }> = (props) => {
  return (
    <div>
      <h2>Detalles del Pedido</h2>
      <p>Cliente: {props.pedido.cliente}</p>
      <p>Producto: {props.pedido.producto}</p>
      <p>Cantidad: {props.pedido.cantidad}</p>
    </div>
  );
};

export default PedidoDetails;