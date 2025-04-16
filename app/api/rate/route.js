  
 
import clientPromise from '../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET() {
  try {
    const client = await clientPromise; // Connect to MongoDB
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('Review'); // Replace with your collection name

    const data = await collection.find({}).toArray(); // Fetch all documents

    return NextResponse.json(data); // Return data as JSON
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}








export async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, stars } = body;
        const client = await clientPromise; // Connect to MongoDB
        const db = client.db('test'); // Replace with your database name
        const collection = db.collection('Review'); // Replace with your collection name

        // Insert the new order into the collection
        const result = await collection.insertOne({
          name, description, stars
        });

        return NextResponse.json({ success: true, insertedId: result.insertedId }); // Return success response
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
    }
}
