const productsModel = require('../models/ProductsModels');

const productsService = {
  getProducts: async () => {
    const data = await productsModel.getAll();
    return data;
  },
};

module.exports = productsService;
