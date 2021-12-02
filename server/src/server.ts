import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';

import apiRoutes from './routes/api';

dotenv.config();
const server = express();
const PORT = process.env.PORT || 3000;

// server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use('/', apiRoutes);
server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: 'Page not Found' });
});

//lidando com erros além do 404
//const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // res.status(400); //Bad Request
  // if(err instanceof MulterError) {
  //   res.json({ errror: err.code });
  // } else {
  //   res.json({ errror: 'An error has happenned' })
  // }
//}
// server.use(errorHandler);

server.listen(PORT, () => {
  console.log('App Running');
});