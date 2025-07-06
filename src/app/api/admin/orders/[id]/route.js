import { connectDB } from '@/lib/mongoose';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function PATCH(req, { params }) {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const { status } = await req.json();
  await connectDB();

  const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ status: updated.status });
}
