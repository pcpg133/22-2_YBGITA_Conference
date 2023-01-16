import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import bodyParser from 'body-parser';
import mainRouter from './router/main.js';
import registerRouter from './router/register.js';
import timeRouter from './router/time.js';
import cafeteriaRouter from './router/cafeteria.js';
//import serviceRouter from './router/service.js';
import categoryRouter from './router/category.js';
import imageRouter from './router/image.js';
import { config } from './config.js';
// import { db } from './db/database.js';

const app = express();

// middleware
app.use(express.static('./'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

// main page
app.get('/', (req, res, next) => {
  res.sendStatus(200);
});

// router
app.use('/login', mainRouter);
app.use('/register', registerRouter);
app.use('/time', timeRouter);
app.use('/cafeteria', cafeteriaRouter);
//app.use('/service', serviceRouter);
app.use('/category', categoryRouter);
app.use('/image', imageRouter);

// error 
app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// server listen
app.listen(config.host.port);