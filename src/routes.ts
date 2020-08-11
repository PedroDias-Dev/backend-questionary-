import express from 'express';
import UsersController from './controllers/UsersController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const usersController = new UsersController();
const connectionsController = new ConnectionsController();

//routes.get('/classes', classesController.index);
//routes.post('/classes', classesController.create);
//routes.get('/');

routes.get('/users', usersController.index);
routes.post('/users', usersController.create);
//routes.put('/users', usersController.update);

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)


export default routes;