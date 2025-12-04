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

    // Get filters from query string
    const category = searchParams.getAll('category');
    const subcategory = searchParams.getAll('subcategory');
    const brand = searchParams.getAll('brand');

    // Step 1: Fetch all data (or you can sort by createdAt)
    let allData = await collection.find({}).sort({ sort: 1 }).toArray();

    // Step 2: Apply filters in memory
    if (category.length > 0) {
      allData = allData.filter(item => category.includes(item.category));
    }
    if (subcategory.length > 0) {
      allData = allData.filter(item => subcategory.includes(item.subcategory));
    }
    if (brand.length > 0) {
      allData = allData.filter(item => brand.includes(item.brand));
    }

    const total = allData.length;

    // Step 3: Apply pagination
    const skip = (page - 1) * limit;
    const paginatedData = allData.slice(skip, skip + limit);

    return NextResponse.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      products: paginatedData,
    });

  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
