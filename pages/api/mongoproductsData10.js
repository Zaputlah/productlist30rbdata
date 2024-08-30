import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const uri = process.env.MONGODB_URI; 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect(); 
      console.log('Connected to MongoDB successfully'); 

      const database = client.db('productlist'); 
      const collection = database.collection('product1'); 

      const products = await collection.find({}).toArray(); 
      console.log('Products retrieved successfully:', products);

      res.status(200).json(products); 

    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ message: 'Internal Server Error' });

    } finally {
      await client.close(); 
    }

  } else {
    res.status(405).end(); 
  }
}
