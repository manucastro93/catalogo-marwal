import { Component, createSignal, createResource } from "solid-js";
import PedidoList from "../components/PedidoList";
import PedidoForm from "../components/PedidoForm";
import PedidoDetails from "../components/PedidoDetails";

interface Pedido {
  id: string;
  cliente: string;
  producto: string;
  cantidad: number;
}

const fetchPedidos = async (): Promise<Pedido[]> => {
  const response = await fetch("http://localhost:3000/api/pedidos/all");
  return response.json();
};

const Pedidos: Component = () => {
  const [selectedPedido, setSelectedPedido] = createSignal<Pedido | null>(null);
  const [pedidos] = createResource(fetchPedidos);

  const handleSelectPedido = (pedido: Pedido) => {
    setSelectedPedido(pedido);
  };

  return (
    <div>
      <h1>Pedidos</h1>
      <PedidoList pedidos={pedidos() ?? []} onSelectPedido={handleSelectPedido} />
      {selectedPedido() && <PedidoDetails pedido={selectedPedido()} />}
      <PedidoForm />
    </div>
  );
};

export default Pedidos;