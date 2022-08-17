const productsService = require('../services/productsSaleServices');

const productsController = {
  saleProductsCreate: async (req, res) => {
    const { body } = req;
    await productsService.productSaleError(body);
    await productsService.productIdValidator(body);
    const { data, code } = await productsService.saleProducts(body);
    res.status(code).json(data);
  },
};

module.exports = productsController;
