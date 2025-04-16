import clientPromise from '../../../lib/mongodb'; // Adjust path if needed
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// PATCH: Reduce color qty by code
export async function PATCH(request, { params }) {
  const { id } = params; // color.code is passed as ID
  const { productId, qty } = await request.json(); // Get productId and qty from body

  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const product = await collection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      console.log('❌ Product not found for ID:', productId);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const colorIndex = product.colors.findIndex(color => color.code === id);

    if (colorIndex === -1) {
      console.log('❌ Color code not found:', id);
      return NextResponse.json({ error: 'Color not found' }, { status: 404 });
    }

    const currentQty = parseInt(product.colors[colorIndex].qty, 10);
    const decreaseQty = parseInt(qty, 10);

    if (isNaN(currentQty) || isNaN(decreaseQty)) {
      console.log('❌ Invalid quantity values:', currentQty, decreaseQty);
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }

    if (currentQty < decreaseQty) {
      console.log(`❌ Insufficient quantity: have ${currentQty}, need ${decreaseQty}`);
      return NextResponse.json({ error: 'Insufficient color quantity' }, { status: 400 });
    }

    const newQty = (currentQty - decreaseQty).toString();
    const updateQuery = {};
    updateQuery[`colors.${colorIndex}.qty`] = newQty;

    console.log('🔧 Update Query:', updateQuery);

    const updated = await collection.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: updateQuery },
      { returnDocument: "after" }
    );

    if (!updated.value) {
      console.log('❌ Update succeeded but value is null');
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }

    console.log('✅ Color stock updated:', updated.value.colors[colorIndex]);

    return NextResponse.json({
      success: true, 
    });

  } catch (error) {
    console.error('❌ Error updating color stock:', error);
    return NextResponse.json({ error: 'Failed to update color stock' }, { status: 500 });
  }
}

// GET: Get color stock by code
export async function GET(request, { params }) {
  const { id } = params; // color.code is passed
  const productId = request.nextUrl.searchParams.get('productId'); // get productId from query

  if (!productId) {
    return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const product = await collection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const color = product.colors.find(color => color.code === id);

    if (!color) {
      return NextResponse.json({ error: 'Color not found' }, { status: 404 });
    }

    const stock = parseInt(color.qty, 10);
    if (isNaN(stock)) {
      return NextResponse.json({ error: 'Invalid stock value' }, { status: 400 });
    }

    return NextResponse.json({ code: id, stock });
  } catch (error) {
    console.error('❌ Error fetching color stock:', error);
    return NextResponse.json({ error: 'Failed to fetch color stock' }, { status: 500 });
  }
}
