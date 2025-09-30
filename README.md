# Christian Da Rosa Martinkoski


# API Sistema de Biblioteca

## Sobre
API simples para gerenciar livros de uma biblioteca, com autenticação básica (Basic Token) e permissões de usuário e admin.

# Como iniciar o projeto?

## 1️⃣ Criar pasta e entrar nela
mkdir meu-projeto
cd meu-projeto

## 2️⃣ Inicializar o projeto npm
npm init -y

## 3️⃣ Instalar Express
npm install express

## 4️⃣ Instalar Prisma e cliente
npm install prisma --save-dev
npm install @prisma/client

## 5️⃣ Inicializar Prisma
npx prisma init




## Banco de Dados

**Users**
- `id`: INTEGER, chave primária  
- `username`: TEXT, único  
- `password`: TEXT  
- `isAdmin`: BOOLEAN, padrão false  

**Books**
- `id`: INTEGER, chave primária  
- `title`: TEXT  
- `author`: TEXT  
- `available`: BOOLEAN, padrão true  

---

## Autenticação
- Basic Token (`username:password` em Base64)  
- Usuário comum: ver livros, pegar/devolver livros  
- Admin: todas as permissões + criar/editar/deletar livros  

---

## Rotas

**Autenticação**

POST /auth/register

Body: { username, password }

**Livros**

GET /books

GET /books/:id

POST /books (admin)

PATCH /books/:id (admin)

DELETE /books/:id (admin)

POST /books/:id/borrow

POST /books/:id/return



## Middlewares
- `auth`: verifica token e usuário  
- `admin`: verifica se é admin  

---

## Regras
- Livro só pode ser pego se disponível  
- Usuário não-admin não cria/edita/deleta livros  
- Username único, senha mínima 4 caracteres  

---

```
projeto/
├── node_modules/
├── prisma/
│   ├── migrations/
│   ├── banco.db
│   └── schema.prisma
├── src/
│   ├── controller/
│   │   ├── book.js
│   │   └── user.js
│   ├── middlewares/
│   │   ├── admin.js
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── book.js
│   └── server.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Dados iniciais
```sql
INSERT INTO users (username, password, isAdmin) VALUES 
('admin', '1234', 1),
('user', '1234', 0);

INSERT INTO books (title, author, available) VALUES 
('1984', 'George Orwell', 1),
('Dom Casmurro', 'Machado de Assis', 1),
('Harry Potter', 'J.K. Rowling', 0),
('Clean Code', 'Robert Martin', 1);
