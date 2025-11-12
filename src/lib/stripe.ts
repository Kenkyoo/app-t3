import "server-only";

import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  throw new Error(
    "Environment variable STRIPE_SECRET_KEY is required but was not provided.",
  );
}

export const stripe = new Stripe(stripeSecret);
