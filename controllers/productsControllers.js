const productsService = require('../services/productsServices');

const productsController = {
  getProducts: async (req, res) => {
    const { data, code } = await productsService.getProducts();
    res.status(code).json(data);
  },

  getProductsById: async (req, res) => {
    const { id } = req.params;
    const { code, data } = await productsService.getProductsById(id);
    res.status(code).json(data);
  },
  createProducts: async (req, res) => {
    const { name } = req.body;
    const { code, data } = await productsService.createProduct(name);
    res.status(code).json(data);
  },
};

module.exports = productsController;
