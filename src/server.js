import express from 'express';
import roteador from "./routes/book.js";
import rotaUsuario from "./routes/auth.js";

const app = express();
app.use(express.json())
app.use('/books', roteador);
app.use('/auth/register', rotaUsuario);
app.listen(3000);