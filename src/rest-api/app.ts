import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

import { createBot } from '../bot-core';

function cors(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
}

const asyncErrorHandler = (fn: RequestHandler) => 
  (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

export function createApp() {
  const bot = createBot();
  const app = express();
  app.use(bodyParser.json());
  app.use(cors);

  app.post('/messages', asyncErrorHandler(async (req: Request, res: Response) => {
    const message = req.body.message ? req.body.message : req.body.edited_message;
    await bot.reactToUserMessage(message);
    return res.json({ success: true });
  }));

  app.get('/health', (req: Request, res: Response) => res.json({ up: true }));

  return app;
}

type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
