import user_controller from "../controller/user.js";
import express from "express";

const roteador = express.Router();

roteador.post("/", (req, res) => {
    user_controller.cadastrar(req, res);
});

export default roteador;




// POST /auth/register
// - Cadastrar novo usuário
// - Body: { username, password }
// - Response: { message, userId }