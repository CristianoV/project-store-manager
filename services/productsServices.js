const productsModel = require('../models/ProductsModels');

const productsService = {
  getProducts: async () => {
    const data = await productsModel.getAll();
    return data;
  },
  getProductsById: async (id) => {
    const data = await productsModel.getById(id);
    // if (!data) {
    //   return { message: 'Product not found' };
    // }
    return data;
  },
};

module.exports = productsService;
