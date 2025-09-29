-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "author" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_book" ("author", "id", "title") SELECT "author", "id", "title" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
