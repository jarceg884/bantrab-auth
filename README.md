# Bantrab Auth Demo

Functional login page with **Sign in** and **Sign up** built with Next.js (App Router) + Node.js API routes, styled after the provided Bantrab design.

## Stack

- Next.js 15 (App Router, standalone output for Docker)
- API Routes (Node.js runtime): `/api/auth/signup`, `/api/auth/signin`, `/api/auth/signout`, `/api/auth/me`
- bcryptjs for password hashing, jose for JWT session cookies (HttpOnly)
- JSON file user store (`data/users.json`) — zero external DB for the demo
- Dockerized with multi-stage build

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Run with Docker

```bash
docker build -t bantrab-auth .
docker run -p 3000:3000 -v bantrab_data:/app/data bantrab-auth
```

## Routes

| Route | Description |
|---|---|
| `/` | Login (sign in) |
| `/signup` | Create account |
| `/signin` | Login (alias) |
| `/dashboard` | Protected area (requires session) |
