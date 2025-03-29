import { Component } from "solid-js";
import { A } from "@solidjs/router";

const Sidebar: Component = () => {
  return (
    <nav style={{ width: "250px", padding: "1rem", background: "#f4f4f4" }}>
      <ul style={{ "list-style-type": "none", padding: 0 }}>
        <li>
          <A href="/dashboard/pedidos" activeClass="active">Pedidos</A>
        </li>
        <li>
          <A href="/dashboard/productos" activeClass="active">Productos</A>
        </li>
        <li>
          <A href="/dashboard/vendedores" activeClass="active">Vendedores</A>
        </li>
        <li>
          <A href="/dashboard/categorias-productos" activeClass="active">Categorías de Productos</A>
        </li>
        <li>
          <A href="/dashboard/pagina" activeClass="active">Página</A>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;