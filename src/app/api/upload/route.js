import cloudinary from '@/lib/cloudinary'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('file')

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'products' }, (err, res) => {
      if (err) reject(err)
      else resolve(res)
    }).end(buffer)
  })

  return NextResponse.json({ url: result.secure_url })
}
