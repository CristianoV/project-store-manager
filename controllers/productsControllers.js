const productsService = require('../services/productsServices');

const productsController = {
  getProducts: async (req, res) => {
    const products = await productsService.getProducts();

    res.status(200).json(products);
  },
};

module.exports = productsController;
