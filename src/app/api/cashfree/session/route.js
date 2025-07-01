import { NextResponse } from 'next/server'
import axios from 'axios'
import crypto from 'crypto'

export async function POST(req) {
  const { total, address, items, email } = await req.json()

  const customerId = ((email?.split("@")[0] || "guest").replace(/[^a-zA-Z0-9_-]/g, "") + "_" + Date.now())

  const order_id = "order_" + crypto.randomBytes(6).toString("hex")

  const payload = {
    order_id,
    order_amount: total,
    order_currency: "INR",
    customer_details: {
      customer_id: customerId,
      customer_phone: address.phone,
      customer_name: address.name,
      customer_email: email,
    },
    order_meta: {
      return_url: `https://sparknstitch.com/orders?order_id=${order_id}`,
    },
  }

  try {
    const res = await axios.post(
      'https://sandbox.cashfree.com/pg/orders',
      payload,
      {
        headers: {
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
          'x-api-version': '2022-09-01',
          'Content-Type': 'application/json',
        },
      }
    )

    return NextResponse.json({
      payment_session_id: res.data.payment_session_id,
      order_id,
    })
  } catch (err) {
    console.error('Session Error:', err.response?.data || err.message)
    return NextResponse.json({ error: 'Session creation failed' }, { status: 500 })
  }
}
