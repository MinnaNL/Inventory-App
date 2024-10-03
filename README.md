# Inventiq
** Inventory App **

Backend + Frontend

I built it using: HTML, CSS, JavaScript, Next.js, React, Bootstrap, Docker, PgAmin, PostgreSQL and Prisma.

## För att köra applikationen:

Docker måste vara installerat och öppnat på datorn
1. Starta code editor (tex VSCode) och skriv i terminalen:
```
   docker compose up -d
```
Se till att docker-applikationen är igång, det ska stå 'engine running'. 
Docker startar en container

2. Öppna webbläsare och gå till [http://localhost:5050](http://localhost:5050)

3. Inloggningauppgifterna till postgres och pgAdmin ligger i docker.compose.yml-filen och .env

  ```
Database (postgreSQL):
  POSTGRES_USER=admin
  POSTGRES_PASSWORD=root
  POSTGRES_DB=inventiq
  ports: "6500:5432"

PgAdmin:
  PGADMIN_DEFAULT_EMAIL=admin@admin.com
  PGADMIN_DEFAULT_PASSWORD=admin
  JWT_SECRET=my-secret-key
  ports: "5050:80"
```

4. Logga in på PgAdmin

5. Öppna VScode och skriv i terminalen för att starta igång utvecklingsservern:

```
npm run dev
```

6. Öppna [http://localhost:3000](http://localhost:3000) i webbläsaren.

För att använda inventiq appen: 
Registrera eller logga in för att kunna köra CRUD-operationer för items (create, read, update, delete). Dock möjligt att se inventory utan att vara inloggad (read). 



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
