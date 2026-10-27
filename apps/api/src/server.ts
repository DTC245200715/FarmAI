import express, { Request, Response, NextFunction } from 'express';
import { apiRouter } from './routes/apiRoutes';

export function createApiApp() {
  const app = express();

  // CORS Middleware (zero-dependency)
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (_req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.use(express.json());

  // Mount API Router
  app.use('/api', apiRouter);

  return app;
}

