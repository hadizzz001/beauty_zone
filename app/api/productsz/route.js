import clientPromise from '../../lib/mongodb';
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    const skip = (page - 1) * limit;

    // Get filters from query string
    const category = searchParams.getAll('category');
    const subcategory = searchParams.getAll('subcategory');
    const brand = searchParams.getAll('brand');

    // Build MongoDB query based on filters
    const query = {};
    if (category.length > 0) {
      query.category = { $in: category };
    }
    if (subcategory.length > 0) {
      query.subcategory = { $in: subcategory };
    }
    if (brand.length > 0) {
      query.brand = { $in: brand };
    }

    const total = await collection.countDocuments(query);

    const data = await collection.find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      products: data,
    });

  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
