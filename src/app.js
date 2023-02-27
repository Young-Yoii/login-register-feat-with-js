import cors from 'cors';
import express from 'express';
import { viewsRouter, userRouter } from './routes';

const app = express();

// CORS 에러 방지
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// html, css, js 라우팅
app.use(viewsRouter);
app.use('/api', userRouter);

export { app };
