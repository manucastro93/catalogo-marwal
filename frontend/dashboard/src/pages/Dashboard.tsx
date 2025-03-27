import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "solid-app-router";
import { getUsers, getVendedores, getProducts, User, Vendedor, Producto } from ".././services/api";

const Dashboard = () => {
  const [users, setUsers] = createSignal<User[]>([]);
  const [vendedores, setVendedores] = createSignal<Vendedor[]>([]);
  const [products, setProducts] = createSignal<Producto[]>([]);
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
    setUsers(await getUsers());
    setVendedores(await getVendedores());
    setProducts(await getProducts());
  };

  return (
    <div class="container mt-5">
      <h2>Dashboard</h2>
      <div class="row">
        <div class="col">
          <h3>Users</h3>
          <ul class="list-group">
            {users().map(user => (
              <li class="list-group-item">{user.nombre}</li>
            ))}
          </ul>
        </div>
        <div class="col">
          <h3>Vendedores</h3>
          <ul class="list-group">
            {vendedores().map(vendedor => (
              <li class="list-group-item">{vendedor.nombre} - {vendedor.link}</li>
            ))}
          </ul>
        </div>
        <div class="col">
          <h3>Products</h3>
          <ul class="list-group">
            {products().map(product => (
              <li class="list-group-item">{product.nombre} - ${product.precio}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;