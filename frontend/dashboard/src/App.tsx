import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Pedidos from "./pages/Pedidos";
import Productos from "./pages/Productos";
import Vendedores from "./pages/Vendedores";
import CategoriasProductos from "./pages/CategoriasProductos";
import Pagina from "./pages/Pagina";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/dashboard/*" component={() => (
          <ProtectedRoute>
            <DashboardLayout>
              <Route path="/dashboard/pedidos" component={Pedidos} />
              <Route path="/dashboard/productos" component={Productos} />
              <Route path="/dashboard/vendedores" component={Vendedores} />
              <Route path="/dashboard/categorias-productos" component={CategoriasProductos} />
              <Route path="/dashboard/pagina" component={Pagina} />
            </DashboardLayout>
          </ProtectedRoute>
        )} />
      </Router>
    </AuthProvider>
  );
};

export default App;