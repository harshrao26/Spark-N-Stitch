import { connectDB } from '@/lib/mongoose';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(req) {
  // 🔐 Optional admin protection
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== 'admin') {
  //   return Response.json({ error: 'Unauthorized' }, { status: 403 });
  // }

  try {
    const body = await req.json();
    await connectDB();

    const product = await Product.create({
      name: body.name,
      price: Number(body.price),
      stock: Number(body.stock),
      images: body.images || [],
      idealFor: body.idealFor,
      brand: body.brand,
      type: body.type,
      sizes: Array.isArray(body.sizes) ? body.sizes : [],
      color: body.color || '',
      clothType: body.idealFor === 'Fashion' ? body.clothType || '' : undefined,
      jewelleryType: body.idealFor === 'Jewellery' ? body.jewelleryType || undefined : undefined,
      jewelleryColor: body.idealFor === 'Jewellery' ? body.jewelleryColor || undefined : undefined,
      description: body.description || '',
    });

    return Response.json(product, { status: 201 });
  } catch (err) {
    console.error('Create Product Error:', err);
    return Response.json({ error: 'Server Error', details: err.message }, { status: 500 });
  }
}
