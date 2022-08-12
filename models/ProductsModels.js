const db = require('./connection');

const userModel = {
  getAll: async () => {
    const [result] = await db.query(`
    SELECT * FROM StoreManager.products`);
    return result;
  },
  getById: async (id) => {
    const [[result]] = await db.query(`
      SELECT * FROM StoreManager.products
      WHERE id = ?
    `, [id]);
    return result;
  },
  create: async (name) => {
    const [result] = await db.query(`
      INSERT INTO StoreManager.products (name)
      VALUES (?)
    `, [name]);
    return result;
  },
};

module.exports = userModel;