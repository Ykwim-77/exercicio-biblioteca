Sobre

Essa é uma API simples para gerenciar livros de uma biblioteca. Ela tem autenticação básica (Basic Token) e diferenciação de usuários comuns e administradores.

Objetivos

Criar rotas REST básicas

Implementar autenticação e autorização

Fazer CRUD de livros usando Prisma e SQLite

Diferenciar permissões de usuário comum e admin

Banco de Dados
Users

id: INTEGER, chave primária

username: texto, único

password: texto

isAdmin: booleano, padrão false

Books

id: INTEGER, chave primária

title: texto

author: texto

available: booleano, padrão true

Autenticação

Formato: Basic Token (username:password codificado em Base64)

Usuário comum: ver livros, pegar e devolver livros

Admin: tudo que o usuário pode + criar, editar e deletar livros

Rotas Principais
Autenticação
POST /auth/register
Body: { username, password }

Livros
GET /books              → listar livros
GET /books/:id          → detalhes do livro
POST /books             → criar livro (só admin)
PATCH /books/:id        → atualizar livro (só admin)
DELETE /books/:id       → deletar livro (só admin)
POST /books/:id/borrow  → pegar emprestado
POST /books/:id/return  → devolver

Middlewares

auth: valida Basic Token, garante que o usuário existe

admin: verifica se o usuário é admin

Regras básicas

Livro só pode ser pego se estiver disponível

Usuário não-admin não pode criar/editar/deletar livros

Username único e senha mínima de 4 caracteres

Primeiro usuário cadastrado vira admin
