// src/app/api/orders/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongoose';
import Order from '@/models/Order';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Login required' }, { status: 401 });
    }

    const { items, address, payment } = await req.json();
    const total = items.reduce((sum, p) => sum + p.price * p.qty, 0);

    await connectDB();

    await Order.create({
      userEmail: session.user.email,
      items: items.map(i => ({
        productId: i._id,
        name: i.name,
        quantity: i.qty,
        price: i.price,
        selectedSize: i.selectedSize || null,
        color: i.color || null,
        image: i.images?.[0] || null,
      })),
      total,
      address,
      status: payment.mode === 'COD' ? 'pending' : 'paid',
      paymentId: payment.payment_id || payment.order_id || payment.mode || 'cod',
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('ORDER ERROR:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
