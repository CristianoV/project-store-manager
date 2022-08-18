const productsModel = require('../models/ProductsModels');
const { validator } = require('./validator');
const NotFoundError = require('../errors/NotFoundError');
const { schemaProduct } = require('./schemas');

const productsService = {
  productProductError: async (product) => {
    const error = validator(schemaProduct, product);
    if (error) {
      const { data, code } = error;
      throw new NotFoundError(data, code);
    }
  },
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
  updateProduct: async (update) => {
    const { id } = update;
    const data = await productsModel.getById(id);
    if (!data) {
      return { code: 404, data: { message: 'Product not found' } };
    }
    await productsModel.updateProduct(update);
    return { code: 200, data: update };
  },
};

module.exports = productsService;
