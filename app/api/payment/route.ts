import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
import { type NextRequest } from 'next/server'
import db from '@/utils/db'
import { formatDate } from '@/utils/helper'
export const maxDuration = 30
export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers)
  const origin = requestHeaders.get('origin')

  const { bookingId } = await req.json()

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: {
      property: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  if (!booking) {
    return Response.json(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }
  const {
    totalNights,
    orderTotal,
    checkIn,
    checkOut,
    property: { image, name },
  } = booking;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { bookingId: booking.id },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'twd',

            product_data: {
              name: `${name}`,
              images: [image],
              description: `預約共 ${totalNights} 晚住宿, 入住日期: ${formatDate(
                checkIn
              )} 退房日期: ${formatDate(checkOut)}`,
            },
            unit_amount: orderTotal * 100,
          },
        },
      ],
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    })

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);

    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }
}