const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb://127.0.0.1:27017'; // Ganti dengan URI MongoDB Anda
const dbName = 'productlist'; // Nama database Anda
const collectionName = 'product50rb'; // Nama koleksi Anda

// Baca data dari file JSON
fs.readFile('products.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading file', err);
    return;
  }

  const products = JSON.parse(data);

  // Koneksi ke MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert data ke koleksi MongoDB
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (error) {
    console.error('Error inserting documents', error);
  } finally {
    await client.close();
  }
});
