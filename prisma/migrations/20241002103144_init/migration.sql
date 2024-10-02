-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Nameless',
    "description" TEXT NOT NULL DEFAULT 'No description',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT NOT NULL DEFAULT 'No category',

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
