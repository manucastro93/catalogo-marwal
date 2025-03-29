import { Component } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

interface Pedido {
  id: string;
  cliente: string;
  producto: string;
  cantidad: number;
}

interface PedidoListProps {
  pedidos: Pedido[];
  onSelectPedido: (pedido: Pedido) => void;
}

const PedidoList: Component<PedidoListProps> = (props) => {
  return (
    <ul>
      {props.pedidos.map((pedido) => (
        <li onClick={() => props.onSelectPedido(pedido)}>
          {pedido.cliente} - {pedido.producto} - {pedido.cantidad}
        </li>
      ))}
    </ul>
  );
};

export default PedidoList;