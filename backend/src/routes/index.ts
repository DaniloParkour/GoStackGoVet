import { Router } from 'express';

const routes = Router();

// routes.get, post, get, delete, ...
routes.get('/', (req, res) => res.json({ message: 'Hello Sthetics!' }));

export default routes;
