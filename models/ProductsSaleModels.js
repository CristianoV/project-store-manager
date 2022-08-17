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
  saleAllProductsModel: async () => {
    const [result] = await db.query(
      `
      SELECT
        s.id as saleId,
        s.date as date,
        sp.product_id as productId,
        sp.quantity as quantity
      FROM StoreManager.sales AS s
      LEFT JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
      ORDER BY sale_id, productId, quantity
      `,
    );
    return result;
  },
  saleSpecificId: async (id) => {
    const [result] = await db.query(
      `
      SELECT
        s.id as sale_id,
        s.date as date,
        sp.product_id as productId,
        sp.quantity as quantity
      FROM StoreManager.sales AS s
      LEFT JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
      WHERE sale_id = ${id}
      ORDER BY sale_id, productId, quantity
      `,
    );
    return result;
  },
};

module.exports = userModel;
