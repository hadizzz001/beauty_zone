import clientPromise from '../../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { category } = params;

  try {
    const client = await clientPromise; // Connect to MongoDB
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('Product'); // Replace with your collection name

    // Query by category and sort by "sort" field ascending
    const data = await collection.find({ category: category }).sort({ sort: 1 }).toArray();

    return NextResponse.json(data); // Return sorted data
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
