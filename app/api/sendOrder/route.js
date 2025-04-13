import clientPromise from '../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function POST(request) {
    try {
        const body = await request.json();
        const { inputs, items } = body;
        const client = await clientPromise; // Connect to MongoDB
        const db = client.db('test'); // Replace with your database name
        const collection = db.collection('Order'); // Replace with your collection name

        // Insert the new order into the collection
        const result = await collection.insertOne({
            userInfo: items,
            cartItems: inputs,
            createdAt: new Date() // Optional: Add a timestamp
        });

        return NextResponse.json({ success: true, insertedId: result.insertedId }); // Return success response
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
    }
}
