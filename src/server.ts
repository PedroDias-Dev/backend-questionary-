import express from 'express';

import cors from 'cors';
// rota para o routes
import routes from './routes';

const app = express();

// app.get('/', function(req, res){
//     res.redirect('/users');
//  });

app.use(cors());

app.use(express.json());

app.use(routes);

// var port = process.env.PORT || 5000;
// app.listen(port)

app.listen(process.env.PORT || 5000, function(){
    console.log('Running on 5000');
});

//GET: BUSCAR OU LISTAR UMA INFO
//POST: CRIAR
//PUT: ATUALIZAR
//DELETE: DELETAR

//CORPO
//ROUTE PARAMS - '/USERS/:ID
//QUERY PAGINAÇÃO E FILTROS


