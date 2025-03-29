import { Component, createSignal } from "solid-js";

const PedidoForm: Component = () => {
  const [formData, setFormData] = createSignal({
    id: "",
    cliente: "",
    producto: "",
    cantidad: 1,
  });

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData({ ...formData(), [name]: value });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/pedidos", {
      method: formData().id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData()),
    });

    if (response.ok) {
      // Refresh the list of pedidos
      console.log("Pedido saved successfully");
    } else {
      console.error("Error saving pedido");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={formData().id} />
      <div>
        <label>Cliente</label>
        <input name="cliente" value={formData().cliente} onInput={handleChange} />
      </div>
      <div>
        <label>Producto</label>
        <input name="producto" value={formData().producto} onInput={handleChange} />
      </div>
      <div>
        <label>Cantidad</label>
        <input type="number" name="cantidad" value={formData().cantidad} onInput={handleChange} />
      </div>
      <button type="submit">Guardar Pedido</button>
    </form>
  );
};

export default PedidoForm;