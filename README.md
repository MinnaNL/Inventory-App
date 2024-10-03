# Inventiq
** Inventory App **

Backend + Frontend

I built it using: HTML, CSS, JavaScript, Next.js, React, Bootstrap, Docker, PgAmin, PostgreSQL and Prisma. See pics below

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
Registrera eller logga in för att kunna köra CRUD-operationer för items (create, read, update, delete). Om man kollar [http://localhost:3000/items](http://localhost:3000/items) och inte är inloggad, kan man inte se inventory eller ändra något.

<img width="1470" alt="Screenshot 2024-10-03 at 18 35 54" src="https://github.com/user-attachments/assets/8e19c121-aebc-4f17-ac6a-df592e8ede37">

<img width="1469" alt="Screenshot 2024-10-03 at 18 36 44" src="https://github.com/user-attachments/assets/a10dfc6e-7440-4deb-b1c7-70288408e786">

<img width="1470" alt="Screenshot 2024-10-03 at 18 36 56" src="https://github.com/user-attachments/assets/436a695c-a7e5-4aae-9f7f-db248eb599cd">

<img width="1470" alt="Screenshot 2024-10-03 at 18 36 05" src="https://github.com/user-attachments/assets/1b622715-0fc4-4a54-9702-cbc8aad42cf0">

<img width="1470" alt="Screenshot 2024-10-03 at 18 37 17" src="https://github.com/user-attachments/assets/deeab4f6-82e7-4786-8544-313df20a01d9">

<img width="1470" alt="Screenshot 2024-10-03 at 18 36 24" src="https://github.com/user-attachments/assets/40aa0af4-553a-4f15-b52c-d1052257d038">

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
