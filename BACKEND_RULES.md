# Backend Foundation Rules
## Next.js API — Standing Instructions for Every Coding Task

> These rules are non-negotiable. Every route, service, and data layer must follow them.
> If a pattern below conflicts with a one-off request, flag it — do not silently break the rules.

---

## 1. Project Structure — One Concern Per File

Every file has exactly one job. Never co-locate unrelated logic.

```
/app/api/[resource]/route.ts          ← HTTP only: parse, validate, delegate, respond
/lib/services/[resource].service.ts   ← business logic only
/lib/db/[resource].repo.ts            ← database queries only
/lib/schemas/[resource].schema.ts     ← Zod schemas shared by route + service
/lib/db/client.ts                     ← single DB client export (never duplicated)
/lib/env.ts                           ← all env vars, typed and validated at boot
/types/[resource].types.ts            ← shared TypeScript types
/lib/utils/                           ← pure utility functions, no side effects
/middleware.ts                        ← auth + edge checks only
```

**Rule:** If you are in a `route.ts` and you are writing business logic — stop. Extract it.  
**Rule:** If you are in a `service.ts` and you are writing a DB query — stop. Move it to the repo.

---

## 2. Route Handler Rules

Route files only route. They do three things: validate input, call a service, return a response.

### What belongs in a route handler
- Parsing and validating the request body / search params via Zod
- Calling one service function
- Returning a typed `NextResponse.json()` with an explicit HTTP status
- A single top-level `try/catch`

### What never belongs in a route handler
- Business logic of any kind
- Database queries
- Auth checks (those live in `middleware.ts`)
- Multiple service calls that depend on each other (that is orchestration — it belongs in the service layer)

### Route anatomy

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createUserSchema } from '@/lib/schemas/user.schema'
import { createUser } from '@/lib/services/user.service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = createUserSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { data: null, error: { code: 'VALIDATION_ERROR', message: parsed.error.flatten() } },
        { status: 400 }
      )
    }

    const user = await createUser(parsed.data)
    return NextResponse.json({ data: user, error: null, meta: null }, { status: 201 })

  } catch (err) {
    console.error('[POST /api/users]', err)
    return NextResponse.json(
      { data: null, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}
```

### HTTP status codes — use them correctly

| Status | When to use |
|--------|-------------|
| `200` | Successful GET, PATCH, DELETE with a body |
| `201` | Resource successfully created (POST) |
| `204` | Success with no response body |
| `400` | Invalid input / failed validation |
| `401` | Not authenticated |
| `403` | Authenticated but not authorized |
| `404` | Resource not found |
| `409` | Conflict (e.g. duplicate email) |
| `422` | Semantically invalid (valid shape, invalid values) |
| `500` | Unhandled server error |

---

## 3. Input Validation — Parse, Never Trust

All input is untrusted until validated. This applies to: request bodies, query params, route params, headers.

- Define schemas in `/lib/schemas/[resource].schema.ts`
- Use Zod for all validation
- Use `safeParse` in routes (returns result, never throws)
- Use `parse` inside services when calling internal functions you control
- Never access `req.body` or `searchParams` fields directly before validation
- Never cast types to bypass validation (`as SomeType` is a red flag)

```typescript
// lib/schemas/user.schema.ts
import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['admin', 'member']).default('member'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
```

---

## 4. Response Envelope — One Shape for Everything

Every API response uses the same envelope. No exceptions.

```typescript
// Success
{ data: T, error: null, meta: null }

// Success with pagination
{ data: T[], error: null, meta: { total: number, page: number, limit: number } }

// Error
{ data: null, error: { code: string, message: string | object } }
```

Define this type once in `/types/api.types.ts` and import it everywhere.

```typescript
// types/api.types.ts
export type ApiResponse<T> = {
  data: T | null
  error: { code: string; message: string | object } | null
  meta: { total: number; page: number; limit: number } | null
}
```

**Rules:**
- Never return raw objects without the envelope
- Never leak stack traces, DB errors, Prisma error messages, or internal IDs in error responses
- Never return HTML error pages from API routes — always JSON
- `message` in error responses is for the client, `console.error` is for the server

---

## 5. Service Layer Rules

Services own all business logic. They are the only layer that knows the rules of the application.

- Services are plain async functions — no classes, no decorators
- A service may call one or more repo functions
- A service may call other services (composition) — but keep the call chain shallow
- Services receive validated, typed inputs — never raw request objects
- Services throw typed errors or return null for not-found cases — the route handles the HTTP response

```typescript
// lib/services/user.service.ts
import { createUserRepo, getUserByEmailRepo } from '@/lib/db/user.repo'
import { CreateUserInput } from '@/lib/schemas/user.schema'

export async function createUser(input: CreateUserInput) {
  const existing = await getUserByEmailRepo(input.email)
  if (existing) throw new Error('EMAIL_TAKEN')

  return createUserRepo(input)
}
```

---

## 6. Repository Layer Rules

Repos own all database access. They are the only layer that touches the DB client.

- All queries live in `/lib/db/[resource].repo.ts`
- Repos are plain async functions — named with the `Repo` suffix to distinguish them from services
- Repos accept typed inputs, return typed outputs
- Never write raw queries in a service or route

```typescript
// lib/db/user.repo.ts
import { db } from '@/lib/db/client'
import { CreateUserInput } from '@/lib/schemas/user.schema'

export async function createUserRepo(input: CreateUserInput) {
  return db.user.create({
    data: input,
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })
}

export async function getUserByEmailRepo(email: string) {
  return db.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  })
}
```

**Rules:**
- Never use `SELECT *` or `findMany` without explicit `select` — always specify columns
- Never expose password hashes, internal tokens, or audit columns in select unless specifically required
- Always paginate list queries — default limit `20`, max `100`
- Paginated repos return `{ data, total }` so the service can populate `meta`

---

## 7. Database Client — One Instance

```typescript
// lib/db/client.ts — the only place the client is instantiated
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

**Rules:**
- Import `db` from `@/lib/db/client` everywhere
- Never instantiate `PrismaClient` (or equivalent) in any other file
- Never import the DB client inside a route — routes only import services

---

## 8. Auth & Middleware

Auth is enforced at the edge in `middleware.ts`, before any route handler runs.

```typescript
// middleware.ts
export { auth as middleware } from '@/lib/auth'

export const config = {
  matcher: ['/api/:path*'],
}
```

**Rules:**
- Routes never re-check authentication — the middleware guarantees it
- Pass the authenticated session (user id, role) forward via request headers or Next.js context — never re-query the user inside a route
- Authorization (can this user do this action?) lives in the service layer, not the route
- Never hard-code role checks in routes

```typescript
// Service handles authorization
export async function deletePost(postId: string, requesterId: string) {
  const post = await getPostByIdRepo(postId)
  if (!post) throw new Error('NOT_FOUND')
  if (post.authorId !== requesterId) throw new Error('FORBIDDEN')
  return deletePostRepo(postId)
}
```

---

## 9. Environment Variables

All env vars are declared, typed, and validated once at boot. If a required var is missing, the process crashes immediately with a clear error — not silently at runtime.

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
})

export const env = envSchema.parse(process.env)
```

**Rules:**
- Never use `process.env.X` inline anywhere — always import from `@/lib/env`
- Never commit `.env` files — only `.env.example` with blank values
- Server-only env vars are never prefixed `NEXT_PUBLIC_`

---

## 10. Async Rules — Performance is Correctness

### Never serialize parallel work

```typescript
// WRONG — three sequential awaits that don't depend on each other
const user = await getUserById(id)
const posts = await getPostsByUserId(id)
const settings = await getSettingsByUserId(id)

// CORRECT — parallel execution
const [user, posts, settings] = await Promise.all([
  getUserById(id),
  getPostsByUserId(id),
  getSettingsByUserId(id),
])
```

### Never await in a loop without Promise.all

```typescript
// WRONG — serializes N async operations
for (const id of ids) {
  await processItem(id)
}

// CORRECT — concurrent
await Promise.all(ids.map(processItem))

// CORRECT (when order matters and concurrency must be limited)
for (const id of ids) {
  await processItem(id) // only acceptable if each depends on the previous
}
```

### Always use async/await — never mix with .then()

---

## 11. Idempotency & HTTP Method Safety

| Method | Safe (no side effects) | Idempotent (same result repeated) |
|--------|------------------------|-----------------------------------|
| GET | Yes | Yes |
| DELETE | No | Yes |
| PUT | No | Yes |
| POST | No | No |
| PATCH | No | No |

**Rules:**
- `GET` handlers never write to the database
- `DELETE` must succeed or 404 — calling it twice on the same resource returns 404 on the second call, not an error
- For `POST` operations that risk duplication, accept an `Idempotency-Key` header and check it before inserting

---

## 12. Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Route segments | kebab-case | `/api/user-profiles` |
| Service functions | camelCase verb | `createUser`, `getUserById`, `softDeletePost` |
| Repo functions | camelCase verb + `Repo` suffix | `createUserRepo`, `getUserByEmailRepo` |
| Types / interfaces | PascalCase | `CreateUserInput`, `UserResponse` |
| Zod schemas | camelCase + `Schema` | `createUserSchema` |
| Files | `[resource].[layer].ts` | `user.service.ts`, `user.repo.ts` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_PAGE_SIZE` |

---

## 13. Error Handling Strategy

Define a small set of known error codes that services throw. The route layer catches them and maps to HTTP status codes.

```typescript
// lib/errors.ts
export class AppError extends Error {
  constructor(public code: string, message: string) {
    super(message)
    this.name = 'AppError'
  }
}

// In services
throw new AppError('EMAIL_TAKEN', 'A user with this email already exists')
throw new AppError('NOT_FOUND', 'Post not found')
throw new AppError('FORBIDDEN', 'You do not have permission to do this')

// In routes — map known codes to status
const STATUS_MAP: Record<string, number> = {
  VALIDATION_ERROR: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  EMAIL_TAKEN: 409,
  INTERNAL_ERROR: 500,
}
```

**Rules:**
- Never `throw` raw strings — throw `AppError` or return null
- Never let Prisma / DB errors surface to the client unhandled
- Always `console.error` server-side before returning a 500
- 404 is not an exceptional case — return `null` from the repo and handle it in the route

---

## 14. Pagination — Always Paginate Lists

Never return unbounded arrays. Every list endpoint is paginated.

```typescript
// Incoming (validated via schema)
const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

// Repo
export async function listPostsRepo({ page, limit }: { page: number; limit: number }) {
  const skip = (page - 1) * limit
  const [data, total] = await Promise.all([
    db.post.findMany({ skip, take: limit, select: { id: true, title: true, createdAt: true } }),
    db.post.count(),
  ])
  return { data, total }
}

// Response meta
meta: { total, page, limit }
```

---

## 15. What the Agent Must Never Do

- Never put DB queries in route handlers
- Never put business logic in repo functions  
- Never skip input validation
- Never instantiate the DB client more than once
- Never return raw Prisma/DB errors to the client
- Never use `SELECT *` or omit `select`
- Never use `process.env` directly outside of `lib/env.ts`
- Never `await` inside a `.map()` without `Promise.all`
- Never add business logic to middleware (auth checks only)
- Never create a new file structure — follow the layout in Section 1

---

*Last updated: May 2026 — applies to all Next.js App Router projects using Prisma or Drizzle.*