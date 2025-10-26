## Backend

This folder is backend side of this app.

### Backend stack

Typescript

Nestjs

Typeorm(Postgresql)

Docker

### How to run

Open this folder in terminal

```bash
cd backend
```

Install all of the dependencies

```bash
npm install
```

Start database docker image

```bash
docker compose up -d
```

Start production server

```bash
npm start
```

Or start development server

```bash
npm run start:test