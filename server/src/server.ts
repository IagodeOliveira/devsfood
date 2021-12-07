import express, { Request, Response } from 'express';
import path from "path";
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', apiRoutes);
app.use(express.static(path.join(__dirname, "../../build")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
});

app.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: 'Page not Found' });
});

app.listen(PORT, () => {
  console.log('App Running');
});