import Razorpay from 'razorpay'

export async function POST(req) {
  const { total } = await req.json()

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })

  const options = {
    amount: total * 100, // convert to paise
    currency: 'INR',
    receipt: `order_rcptid_${Date.now()}`,
  }

  try {
    const order = await razorpay.orders.create(options)
    return Response.json(order)
  } catch (err) {
    console.error('RAZORPAY ERROR:', err)
    return Response.json({ error: 'Razorpay error' }, { status: 500 })
  }
}
