import { Component, createSignal, createResource } from "solid-js";
import ProductoList from "../components/ProductoList";
import ProductoForm from "../components/ProductoForm";
import ProductoDetails from "../components/ProductoDetails";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

const fetchProductos = async (): Promise<Producto[]> => {
  const response = await fetch("http://localhost:3000/api/productos/all");
  return response.json();
};

const Productos: Component = () => {
  const [selectedProducto, setSelectedProducto] = createSignal<Producto | null>(null);
  const [productos] = createResource(fetchProductos);

  const handleSelectProducto = (producto: Producto) => {
    setSelectedProducto(producto);
  };

  return (
    <div>
      <h1>Productos</h1>
      <ProductoList productos={productos() ?? []} onSelectProducto={handleSelectProducto} />
      {selectedProducto() && <ProductoDetails producto={selectedProducto() as Producto} />}
      <ProductoForm />
    </div>
  );
};

export default Productos;