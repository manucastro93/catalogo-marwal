import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { getUsuarios, getVendedores, getProductos, Usuario, Vendedor, Producto } from "../services/api";

const Dashboard = () => {
  const [usuarios, setUsuarios] = createSignal<Usuario[]>([]);
  const [vendedores, setVendedores] = createSignal<Vendedor[]>([]);
  const [products, setProducts] = createSignal<Producto[]>([]);
  const [activeTab, setActiveTab] = createSignal("usuarios");
  const navigate = useNavigate();

  createEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  });

  const fetchData = async () => {
    setUsuarios(await getUsuarios());
    setVendedores(await getVendedores());
    setProducts(await getProductos());
  };

  return (
    <div class="container mt-5">
      <h2>Panel de Administración</h2>
      <ul class="nav nav-tabs">
        <li class={`nav-item ${activeTab() === "usuarios" ? "active" : ""}`} onClick={() => setActiveTab("usuarios")}>
          <a class="nav-link" href="#">Usuarios</a>
        </li>
        <li class={`nav-item ${activeTab() === "vendedores" ? "active" : ""}`} onClick={() => setActiveTab("vendedores")}>
          <a class="nav-link" href="#">Vendedores</a>
        </li>
        <li class={`nav-item ${activeTab() === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>
          <a class="nav-link" href="#">Productos</a>
        </li>
      </ul>
      <div class="tab-content mt-3">
        {activeTab() === "usuarios" && (
          <div class="tab-pane active">
            <h3>Usuarios</h3>
            <ul class="list-group">
              {usuarios().map((usuario, index) => (
                <li class="list-group-item" prop:key={index}>{usuario.nombre}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab() === "vendedores" && (
          <div class="tab-pane active">
            <h3>Vendedores</h3>
            <ul class="list-group">
              {vendedores().map((vendedor, index) => (
                <li class="list-group-item" prop:key={index}>{vendedor.nombre} - {vendedor.link}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab() === "products" && (
          <div class="tab-pane active">
            <h3>Productos</h3>
            <ul class="list-group">
              {products().map((product, index) => (
                <li class="list-group-item" prop:key={index}>{product.nombre} - ${product.precio}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;