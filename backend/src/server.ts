import express from 'express';
import routes from './routes';

//Vai apenas executar o arquivo. Também, o arquivo não exporta conteúdo.
import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🐱‍👓 Server running on port 3333');
});
