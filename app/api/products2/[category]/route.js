import clientPromise from '../../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET(request, { params }) {
  const { category } = params;
  const categories = category.split(',');

  try {
    const client = await clientPromise;  
    const db = client.db('test');  
    const collection = db.collection('Product');  

    // Find documents where category is in the list and sort by "sort" field
    const data = await collection
      .find({ category: { $in: categories } })
      .sort({ sort: 1 })
      .toArray(); 

    return NextResponse.json(data);  
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
