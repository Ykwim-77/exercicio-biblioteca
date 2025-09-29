import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifyUser(req, res, next){ 

    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith("Basic ")){

        return res.status(401).json({mensagem: "token precisa ser basic"});
    }

    const conteudo_do_token = auth.split(" ")[1];
    const texto = Buffer.from(conteudo_do_token, "base64").toString("utf8");
    const [usuario, senha] = texto.split(":");

    try{
        const usuarioAchado = await prisma.users.findUnique({where: {username: usuario}});

        if(!usuarioAchado || !usuarioAchado.password === senha){

            return res.status(401).json({mensagem: "usuário ou senha inválidos"});
        }

        req.user = usuarioAchado;

        next();
    }catch(error){
        return res.status(500).json({mensagem: "erro interno"});
    }
}

export default verifyUser;
