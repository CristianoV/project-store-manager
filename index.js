const app = require('./app');
require('dotenv').config();
require('express-async-errors');

const rota = require('./controllers/productsControllers');
const rotaSale = require('./controllers/productsSaleControllers');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.get('/products', rota.getProducts);
app.get('/products/:id', rota.getProductsById);
app.post('/products', rota.createProducts);
app.post('/sales', rotaSale.saleProductsCreate);
app.get('/sales', rotaSale.saleAllProducts);
app.get('/sales/:id', rotaSale.saleSpecificId);

app.use((err, _req, res, _next) => {
  const { message, statusCode } = err;
  return res.status(statusCode).json({ message });
});

app.use('*', (req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
