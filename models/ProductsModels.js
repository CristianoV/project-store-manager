const db = require('./connection');

const userModel = {
  getAll: async () => {
    const [result] = await db.query(
      'SELECT * FROM StoreManager.products',
    );
    return result;
  },
};

module.exports = userModel;