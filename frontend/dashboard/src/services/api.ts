const API_URL = "http://localhost:3000";

const getToken = (): string | null => localStorage.getItem("token");

const headers = (): HeadersInit => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export interface Usuario {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  role: string;
}

export interface Vendedor {
  id: number;
  nombre: string;
  email: string;
  link: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface Pedido {
  cliente_id: number;
  producto_id: number;
  cantidad: number;
  total: number;
}

export const login = async (username: string, password: string): Promise<{ token: string }> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login falló");
  }

  return response.json();
};


export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await fetch(`${API_URL}/api/usuarios/all`, {
    headers: headers(),
  });
  return response.json();
};

export const getVendedores = async (): Promise<Vendedor[]> => {
  const response = await fetch(`${API_URL}/api/vendedores/all`, {
    headers: headers(),
  });
  return response.json();
};

export const getProductos = async (): Promise<Producto[]> => {
  const response = await fetch(`${API_URL}/api/productos/all`, {
    headers: headers(),
  });
  return response.json();
};

export const createPedido = async (pedido: Pedido): Promise<{ id: number }> => {
  const response = await fetch(`${API_URL}/api/pedidos/all`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(pedido),
  });
  return response.json();
};