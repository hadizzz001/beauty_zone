import clientPromise from '../../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET(request, { params }) {
  const { brand } = params;

  try {
    const client = await clientPromise; // Connect to MongoDB
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('Product'); // Replace with your collection name

    const data = await collection
      .find({ brand: brand })          // Filter by brand
      .sort({ sort: 1 })               // Sort by 'sort' field ascending
      .toArray();                      // Convert to array

    return NextResponse.json(data);    // Return sorted data
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
