const productsService = require('../services/productsSaleServices');

const productsController = {
  saleProductsCreate: async (req, res) => {
    const { body } = req;
    await productsService.productSaleError(body);
    await productsService.productIdValidator(body);
    const { data, code } = await productsService.saleProducts(body);
    res.status(code).json(data);
  },
  saleAllProducts: async (req, res) => {
    const { data, code } = await productsService.saleAllProducts();
    res.status(code).json(data);
  },
  saleSpecificId: async (req, res) => {
    const { id } = req.params;
    await productsService.saleIdValidator(id);
    const { data, code } = await productsService.saleSpecificId(id);
    res.status(code).json(data);
  },
};

module.exports = productsController;
