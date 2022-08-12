const productsService = require('../services/productsServices');

const productsController = {
  getProducts: async (req, res) => {
    const products = await productsService.getProducts();

    res.status(200).json(products);
  },
  getProductsById: async (req, res) => {
    const { id } = req.params;

    const product = await productsService.getProductsById(id);

    if (product === undefined) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  },
};

module.exports = productsController;
