const app = require('./app');
require('dotenv').config();
const rota = require('./controllers/productsControllers');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.get('/products', rota.getProducts);
app.get('/products/:id', rota.getProductsById);
app.post('/products', rota.createProducts);

app.use('*', (req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
