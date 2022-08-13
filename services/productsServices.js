const productsModel = require('../models/ProductsModels');

const productsService = {
  getProducts: async () => {
    const data = await productsModel.getAll();
    return { data, code: 200 };
  },
  getProductsById: async (id) => {
    const data = await productsModel.getById(id);
    if (!data) {
      return { code: 404, data: { message: 'Product not found' } };
    }
    return { code: 200, data };
  },
  createProduct: async (name) => {
    if (!name) return { code: 400, data: { message: '"name" is required' } };
    if (name.length < 5) {
      return {
        code: 422,
        data: { message: '"name" length must be at least 5 characters long' },
      };
    }
    const { insertId } = await productsModel.create(name);
    const data = { id: insertId, name };
    return { code: 201, data };
  },
};

module.exports = productsService;
