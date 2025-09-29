import controller from "../controller/book.js";
import express from "express";
import verifyAdmin from "../middlewares/admin.js";
import verifyUser from "../middlewares/auth.js";


const roteador = express.Router();


roteador.get("/",verifyUser,verifyAdmin, (req, res) => {
controller.ListarLivros(req, res);
});

roteador.get("/:id",verifyUser,(req, res) => {
controller.pegar1livro(req, res);
});


roteador.post("/",verifyAdmin, (req, res) => {
controller.CriarLivro(req, res);
});

roteador.patch("/:id",verifyAdmin, (req, res) => {
controller.atualizarLivro(req, res);
});
roteador.delete("/:id", verifyAdmin, (req, res) =>{
    controller.deletarLivro(req,res)
})
roteador.post("/:id/borrow",verifyUser, verifyAdmin, (req, res)=>{
    controller.pegar(req, res)
});
roteador.post("/:id/return",verifyUser, verifyAdmin, (req, res)=>{
    controller.devolver(req, res)
});


export default roteador