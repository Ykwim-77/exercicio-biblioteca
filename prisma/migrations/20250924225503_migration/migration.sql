-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "author" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
