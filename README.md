# app-t3

Aplicación simple de compras con pagos usando **Stripe**. Construida con **Next.js**, **tRPC**, **Prisma**, **Supabase** y **TailwindCSS**.

## Demo

* **Deploy:** [https://app-t3-red.vercel.app/](https://app-t3-red.vercel.app/)
* **Repo:** [https://github.com/Kenkyoo/app-t3](https://github.com/Kenkyoo/app-t3)

## Tecnologías

* Next.js
* Prisma + Supabase
* Stripe (Checkout)
* tRPC
* React Query
* TailwindCSS
* Auth con better-auth

## Funciones principales

* Registro e inicio de sesión
* Listado de productos
* Carrito de compras básico
* Pagos con Stripe Checkout
* Gestión de datos con Prisma

## Scripts

* `npm run dev` — modo desarrollo
* `npm run build` — build producción
* `npm run start` — iniciar build
* `npm run db:generate` — migraciones
* `npm run db:studio` — Prisma Studio

## Variables de entorno

Crea un `.env` con:

```
DATABASE_URL="URL de Supabase"
STRIPE_SECRET_KEY="clave secreta"
STRIPE_PUBLIC_KEY="clave pública"
NEXTAUTH_SECRET="secreto"
```

## Deploy

El deploy se realiza en **Vercel**. No requiere configuración extra más que las variables de entorno.

## Licencia

MIT
