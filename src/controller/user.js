import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cadastrar(req, res) {
  const { username, password } = req.body;

  // valida campos obrigatórios
  if (!username || !password) {
    return res.status(400).json({ mensagem: "usuário e senha obrigatórios" });
  }

  // valida tamanho da senha
  if (password.length < 6) {
    return res.status(400).json({ mensagem: "senha precisa ter ao menos 6 caracteres" });
  }

  try {
    // verifica se username já existe
    const usuarioExistente = await prisma.users.findUnique({ where: { username } });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Usuário já existe" });
    }

    // cria usuário
    const novoUsuario = await prisma.users.create({
      data: { username, password },
    });

    return res.status(201).json({ mensagem: `O usuário ${novoUsuario.username} foi criado com sucesso` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
}

export default { cadastrar };
