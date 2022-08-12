const app = require('./app');
require('dotenv').config();
const rota = require('./controllers/productsControllers');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.get('/teste', (req, res) => {
  res.status(200).send('<h1>Testa</h1>');
});

app.get('/products', rota.getProducts);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
