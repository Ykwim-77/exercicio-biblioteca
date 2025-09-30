import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cadastrar(req, res) {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ mensagem: "username e password obrigatórios" });
    }
    if(password.length < 4) {
        return res.status(400).json({ mensagem: "senha precisa ter ao menos 6 caracteres" });
    }

    try {

        const novoUsuario = await prisma.users.create({
            data: { username, password }
        });

        return res.status(201).json({ mensagem: `O usuário ${novoUsuario.username} foi criado com sucesso` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
    }
}

export default { cadastrar };
