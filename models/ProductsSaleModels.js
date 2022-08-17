const db = require('./connection');

const userModel = {
  saleProductsModel: async () => {
    const [result] = await db.query(
      `
      INSERT INTO StoreManager.sales (date)
      VALUES (NOW())
    `,
    );
    return result;
  },
  SaleProductsIdModel: async ({ productId, quantity }, teste1) => {
    const [result] = await db.query(
      `
      INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity)
      VALUES (?, ?, ?)`,
      [productId, teste1, quantity],
    );
      return result;
  },
};

module.exports = userModel;
