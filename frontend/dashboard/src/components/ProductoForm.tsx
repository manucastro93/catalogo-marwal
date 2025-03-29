import { Component, createSignal } from "solid-js";

const ProductoForm: Component = () => {
  const [formData, setFormData] = createSignal({
    id: "",
    nombre: "",
    descripcion: "",
    precio: 0,
  });

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData({ ...formData(), [name]: value });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/productos", {
      method: formData().id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData()),
    });

    if (response.ok) {
      // Refresh the list of productos
      console.log("Producto saved successfully");
    } else {
      console.error("Error saving producto");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={formData().id} />
      <div>
        <label>Nombre</label>
        <input name="nombre" value={formData().nombre} onInput={handleChange} />
      </div>
      <div>
        <label>Descripción</label>
        <input name="descripcion" value={formData().descripcion} onInput={handleChange} />
      </div>
      <div>
        <label>Precio</label>
        <input type="number" name="precio" value={formData().precio} onInput={handleChange} />
      </div>
      <button type="submit">Guardar Producto</button>
    </form>
  );
};

export default ProductoForm;