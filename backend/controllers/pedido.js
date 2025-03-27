const Pedido = require('../models/pedido');
const logger = require('../config/logger');

const createPedido = async (req, res) => {
  const { cliente_id, productos } = req.body;

  try {
    const pedidoId = await Pedido.create({ cliente_id, productos });
    res.status(201).json({ id: pedidoId });
  } catch (err) {
    logger.error('Error creating pedido:', { error: err.message });
    res.status(500).json({ error: 'Error creating pedido', details: err.message });
  }
};

const getPedidosByVendedor = async (req, res) => {
  const vendedorId = req.user.id;

  try {
    const pedidos = await Pedido.findByVendedorId(vendedorId);
    res.status(200).json(pedidos);
  } catch (err) {
    logger.error('Error fetching pedidos by vendedor:', { error: err.message });
    res.status(500).json({ error: 'Error fetching pedidos by vendedor', details: err.message });
  }
};

const updatePedido = async (req, res) => {
  const { id } = req.params;
  const { productos } = req.body;

  try {
    await Pedido.update(id, { productos });
    res.status(200).json({ message: 'Pedido updated successfully' });
  } catch (err) {
    logger.error('Error updating pedido:', { error: err.message });
    res.status(500).json({ error: 'Error updating pedido', details: err.message });
  }
};

const deletePedido = async (req, res) => {
  const { id } = req.params;

  try {
    await Pedido.delete(id);
    res.status(200).json({ message: 'Pedido deleted successfully' });
  } catch (err) {
    logger.error('Error deleting pedido:', { error: err.message });
    res.status(500).json({ error: 'Error deleting pedido', details: err.message });
  }
};

module.exports = {
  createPedido,
  getPedidosByVendedor,
  updatePedido,
  deletePedido,
};