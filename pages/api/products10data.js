import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'products.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      try {
        const products = JSON.parse(data);
        res.status(200).json(products);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
