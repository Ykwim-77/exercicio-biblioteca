import express from 'express';
import roteador from "./routes/book.js";
import admin from "./routes/auth.js";
import verifyUser from './middlewares/auth.js';
import verifyAdmin from './middlewares/admin.js';


const app = express();
app.use(express.json())
app.use('/books', roteador);
app.use('/auth/register', admin);
app.listen(3000);