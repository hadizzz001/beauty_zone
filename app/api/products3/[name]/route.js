import clientPromise from '../../../lib/mongodb';  
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET(request, { params }) {
  const { name } = params;

  try {
    const client = await clientPromise;  
    const db = client.db('test'); 
    const collection = db.collection('Product');  

    // Perform case-insensitive search and sort by "sort" field
    const data = await collection.find({ 
      title: { $regex: name, $options: 'i' }
    }).sort({ sort: 1 }).toArray();  
 
    return NextResponse.json(data);  
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
