const db = require('./connection');

const userModel = {
  getAll: async () => {
    const [result] = await db.query('SELECT * FROM StoreManager.products');
    return result;
  },
  getById: async (id) => {
    const [[result]] = await db.query(`
      SELECT * FROM StoreManager.products
      WHERE id = ?
    `, [id]);
    return result;
  },
};

module.exports = userModel;