const productSalesModel = require('../models/ProductsSaleModels');
const productsModel = require('../models/ProductsModels');
const { validator } = require('./validator');
const { schemaSale } = require('./schemas');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  productSaleError: async (products) => {
    const error = validator(schemaSale, products);
    if (error) {
      const { data, code } = error;
      throw new NotFoundError(data, code);
    }
  },
  productIdValidator: async (products) => {
    const productDb = await productsModel.getAll();

    const idbanco = productDb.map(({ id }) => id);

    const ids = products.map(({ productId }) => productId);

    const check = ids.every((id) => idbanco.includes(id));

    if (!check) {
      throw new NotFoundError('Product not found', 404);
    }
  },
  saleIdValidator: async (id) => {
    const productDb = await productSalesModel.saleAllProductsModel();

    const idbanco = productDb.map(({ saleId }) => saleId);

    const check = idbanco.some((sale) => sale === Number(id));

    if (!check) {
      throw new NotFoundError('Sale not found', 404);
    }
  },
  saleProducts: async (products) => {
    const { insertId } = await productSalesModel.saleProductsModel();

    const newSaleService = products.map((productSale) =>
      productSalesModel.SaleProductsIdModel(productSale, insertId));
    await Promise.all(newSaleService);

    const newSale = {
      id: insertId,
      itemsSold: [...products],
    };

    return { code: 201, data: newSale };
  },
  saleAllProducts: async () => {
    const allSales = await productSalesModel.saleAllProductsModel();
    return { code: 200, data: allSales };
  },
  saleSpecificId: async (id) => {
    const saleSpecificId = await productSalesModel.saleSpecificId(id);
    return { code: 200, data: saleSpecificId };
  },
};

module.exports = productsService;
