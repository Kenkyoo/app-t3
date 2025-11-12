// app/api/checkout_sessions/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Obtener el priceId del body de la petición
    const body = await request.json();
    const { priceId, quantity = 1 } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "Se requiere el priceId" },
        { status: 400 },
      );
    }

    // Crear la sesión de Checkout
    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: quantity,
          },
        ],
        mode: "payment",
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
      });

    if (!session.url) {
      return NextResponse.json(
        { error: "No se pudo generar la URL de sesión" },
        { status: 500 },
      );
    }

    // Devolver la URL en lugar de redirigir
    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode ?? 500 },
      );
    }

    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Error desconocido" },
      { status: 500 },
    );
  }
}
