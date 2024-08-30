import { MongoClient } from 'mongodb';

// Fungsi handler ini menangani permintaan HTTP pada endpoint tertentu
export default async function handler(req, res) {
  // Memeriksa metode permintaan HTTP
  if (req.method === 'GET') {
    // Mengambil URI MongoDB dari variabel lingkungan
    const uri = process.env.MONGODB_URI; 
    // Membuat instance MongoClient dengan URI dan opsi konfigurasi
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      // Menghubungkan ke server MongoDB
      await client.connect(); 
      console.log('Connected to MongoDB successfully'); 

      // Mengakses database dan koleksi yang ditentukan
      const database = client.db('productlist'); 
      const collection = database.collection('product'); 

      // Mengambil semua dokumen dari koleksi sebagai array
      const products = await collection.find({}).toArray(); 
      console.log('Products retrieved successfully:', products);

      // Mengirimkan data produk sebagai respons dengan status 200 (OK)
      res.status(200).json(products); 

    } catch (error) {
      // Menangani kesalahan jika terjadi saat menghubungkan ke MongoDB atau mengambil data
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ message: 'Internal Server Error' });

    } finally {
      // Menutup koneksi MongoDB
      await client.close(); 
    }

  } else {
    // Menangani metode HTTP yang tidak diizinkan dengan status 405 (Method Not Allowed)
    res.status(405).end(); 
  }
}
