import { MongoClient } from 'mongodb'; // Impor MongoClient

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const uri = process.env.MONGODB_URI; // Ambil URI dari environment variable
    const client = new MongoClient(uri);

    try {
      await client.connect();
      console.log('Connected to MongoDB successfully');

      const database = client.db('productlist');
      const collection = database.collection('product');

      // Parsing query parameters
      const { page = 1, itemsPerPage = 10, sortBy = 'createdAt', sortOrder = 'asc', filterName = '', filterCategory = '' } = req.query;

      const filter = {};
      if (filterName) filter.name = { $regex: filterName, $options: 'i' };
      if (filterCategory) filter.category = filterCategory;

      const sort = {};
      if (sortBy) sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

      const products = await collection.find(filter)
        .sort(sort)
        .skip((Number(page) - 1) * Number(itemsPerPage))
        .limit(Number(itemsPerPage))
        .toArray();

      const totalProducts = await collection.countDocuments(filter);

      console.log('Sending products:', products); // Log data yang dikirimkan

      res.status(200).json({
        totalProducts,
        products,
      });

    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ message: 'Internal Server Error' });

    } finally {
      await client.close();
    }

  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
