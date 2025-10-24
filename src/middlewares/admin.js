function verifyAdmin(req, res, next) {

  if (!req.user) {
    return res.status(401).json({ mensagem: "usuário não autenticado" });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ mensagem: "acesso negado" });
  }

  next();
}

export default verifyAdmin;