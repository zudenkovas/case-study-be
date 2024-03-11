## About

This is a simple Node.js Backend API project built with Express, Typescript, Prisma ORM, PostgreSQL and Docker.

## Prerequisites

- Node.js v20.10.0 (LTS version)
- Docker (latest version)

## Getting Started

Inside the project directory run the following commands:

First install the dependencies by running:

```bash
npm install
```

Build the docker container by running:

```bash
docker-compose up -d
```

Then run the migrations:

```bash
npm run migrate:dev
```

To run the development server:

```bash
npm run dev
```

To run the tests:

```bash
npm run test
```
