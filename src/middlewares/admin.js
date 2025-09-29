import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifyAdmin(req, res, next){ 
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith("Basic ")){

        return res.status(401).json({mensagem: "token precisa ser basic"});
    }

    const conteudo_do_token = auth.split(" ")[1];
    
    const texto = Buffer.from(conteudo_do_token, "base64").toString("utf8");

    const [usuario] = texto.split(":");

    try{
        const usuarioAchado = await prisma.users.findUnique({where: {username: usuario}});
        if(!usuarioAchado){
            return res.status(401).json({mensagem: "token inválido"});
        }

        if(!usuarioAchado.isAdmin){
            return res.status(403).json({mensagem: "acesso negado"});
        }

        req.user = usuarioAchado;
        next();
    }catch(error){
        return res.status(500).json({mensagem: "erro interno"});
    }
}

export default verifyAdmin;
