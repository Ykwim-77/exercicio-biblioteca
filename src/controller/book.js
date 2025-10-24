import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


async function ListarLivros(req, res){
  try{
    const usuario_do_banco = await prisma.books.findMany();
    res.status(200).json(usuario_do_banco);
  }catch(error){
    console.log(error)
  }

}
async function pegar1livro(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "O id precisa ser um número inteiro" });
  }

  try {
    const livro = await prisma.books.findUnique({ where: { id } });
    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }
    res.status(200).json(livro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar o livro" });
  }
}

async function CriarLivro(req, res) {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ mensagem: "Título e autor são obrigatórios" });
  }

  try {
    const livroExistente = await prisma.books.findFirst({
      where: { title },
    });

    if (livroExistente) {
      return res.status(400).json({ mensagem: "Já existe um livro com esse título" });
    }


    const livro = await prisma.books.create({
      data: { title, author, available: true },
    });

    return res.status(201).json({ mensagem: `O livro '${livro.title}' foi criado com sucesso` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao criar o livro" });
  }
}
async function atualizarLivro(req,res){
    const { id } = req.params;
    const idnumber = parseInt(id);
    const { title, author, available} = req.body;
    if(isNaN(idnumber)){
      return res.status(400).json({mensagem: "o id precisa ser um número inteiro"})
    }

    try{
      await prisma.books.update({where:{id:idnumber},
        data:{
          title:title,
          author:author,
          available:available
        }
      })

    }catch(error){
      console.log(error);
    }
  return res.status(200).json({mensagem: `Livro com id:${idnumber} foi atualizado`})
}


async function deletarLivro(req,res){
  const { id } = req.params;
  const idnumber = parseInt(id);
  if(isNaN(idnumber)){
    return res.status(400).json({mensagem: "o id precisa ser um número inteiro"})
  }

  try{
    await prisma.books.delete({
      where: { id: idnumber }
    })
  }catch(error){
    console.log(error)
  }
  return res.status(200).json({mensagem: `Livro com id:${idnumber} foi deletado`})

}

async function pegar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "O id precisa ser um número inteiro" });
  }

  try {
    const livro = await prisma.books.findUnique({ where: { id } });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    if (!livro.available) {
      return res.status(400).json({ mensagem: "Livro indisponível, tente outro!" });
    }

    await prisma.books.update({
      where: { id },
      data: { available: false },
    });

    return res.status(200).json({ mensagem: `Livro com id:${id} foi emprestado` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao emprestar o livro" });
  }
}

async function devolver(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "O id precisa ser um número inteiro" });
  }

  try {
    const livro = await prisma.books.findUnique({ where: { id } });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    if (livro.available) {
      return res.status(400).json({ mensagem: "O livro já está disponível" });
    }

    await prisma.books.update({
      where: { id },
      data: { available: true },
    });

    return res.status(200).json({ mensagem: `Livro com id:${id} foi devolvido` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao devolver o livro" });
  }
}

export default{ListarLivros, pegar1livro, CriarLivro, atualizarLivro, deletarLivro, pegar, devolver}





















