import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();




let ultimoId = 1;
async function ListarLivros(req, res){
  try{
    const usuario_do_banco = await prisma.book.findMany();
    res.status(200).json(usuario_do_banco);
  }catch(error){
    console.log(error)
  }

}
async function pegar1livro(req,res){
const  id  = parseInt(req.params.id);
const livro = await prisma.book.findUnique({where: {id: id }});
res.json(livro);
}

async function CriarLivro(req,res){
  const {title, author} = req.body;
  if(!title || !author){
      return res.status(400).json({mensagem: "title e author obrigatórios"});
  }

  try{
    const livro = await prisma.book.create({
      data:{
        title:title,
        author:author
      }
    });
    return res.status(201).json({mensagem:`o livro ${title} foi criado com sucesso`});
  } catch(error){
    console.log(error);
    return res.status(500).json({mensagem: "Erro ao criar o livro"});
  }
};

async function atualizarLivro(req,res){
    const { id } = req.params;
    const idnumber = parseInt(id);
    const { title, author, available} = req.body;
    if(isNaN(idnumber)){
      return res.status(400).json({mensagem: "o id precisa ser um número inteiro"})
    }

    try{
      await prisma.book.update({where:{id:idnumber},
        data:{
          title:title,
          author:author,
          available:available
        }
      })

    }catch(error){
      console(error);
    }
res.status(204).json({mensagem: `Livro com id:${idnumber} foi atualizado`})
}


async function deletarLivro(req,res){
  const { id } = req.params;
  const idnumber = parseInt(id);
  if(isNaN(idnumber)){
    return res.status(400).json({mensagem: "o id precisa ser um número inteiro"})
  }

  try{
    await prisma.book.delete({
      where: { id: idnumber }
    })
  }catch(error){
    console.log(error)
  }
  res.status(204).json({mensagem: `Livro com id:${idnumber} foi deletado`})

}

async function pegar(req, res) {
  const { id } = req.params;
  const idnumber = parseInt(id);
  if (isNaN(idnumber)) {
    return res.status(400).json({ mensagem: "o id precisa ser um número inteiro" });
  }
  try {
    await prisma.book.update({
      where: { id: idnumber },
      data: {
        available: false,
      },
    });
    const livro = await prisma.book.findUnique({
      where: { id: idnumber }
    });
    if(livro.available == false){
      return res.status(400).json({ mensagem: "Livro indisponível" });
    }
  } catch (error) {
    console.log(error);
  }
  res.status(204).json({ mensagem: `Livro com id:${idnumber} foi emprestado` });
  
}

async function devolver(req, res) {
  const { id } = req.params;
  const idnumber = parseInt(id);
  if (isNaN(idnumber)) {
    return res.status(400).json({ mensagem: "o id precisa ser um número inteiro" });
  }
  try {
    await prisma.book.update({
      where: { id: idnumber },
      data: {
        available: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
  res.status(204).json({ mensagem: `Livro com id:${idnumber} foi devolvido` });
  
}

export default{ListarLivros, pegar1livro, CriarLivro, atualizarLivro, deletarLivro, pegar, devolver}





















