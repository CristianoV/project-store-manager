const productsModel = require('../models/ProductsModels');

const productsService = {
  getProducts: async () => {
    const data = await productsModel.getAll();
    return { data, code: 200 };
  },
  getProductsById: async (id) => {
    const data = await productsModel.getById(id);
    if (!data) {
      const message = { message: 'Product not found' };
      return { code: 404, data: message };
    }
    return { code: 200, data };
  },
};

module.exports = productsService;
