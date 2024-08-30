const fs = require('fs');

// Fungsi untuk menghasilkan ID unik
const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// Daftar nama produk dan prefix code
const productNames = [
  { name: 'Bosch', codePrefix: 'bsh' },
  { name: 'Ryu', codePrefix: 'ryu' },
  { name: 'Tekiro', codePrefix: 'tko' },
  { name: 'Livi', codePrefix: 'lvi' },
];

// Fungsi untuk memformat angka menjadi format Rupiah tanpa desimal
const formatRupiah = (number) => {
  const parts = number.toString().split('.');
  const integerPart = parts[0];
  return `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const generateProducts = (num) => Array.from({ length: num }, (_, i) => {
  const product = productNames[i % productNames.length]; // Pilih produk berdasarkan indeks
  const randomNum = Math.floor(Math.random() * 900) + 100; // Menghasilkan angka random 3 digit
  return {
    id: i + 1,
    image: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`,
    name: product.name,
    price: formatRupiah(Math.floor(Math.random() * 100000)), // Format harga ke Rupiah tanpa desimal
    code: `${product.codePrefix}${randomNum}`, // Menambahkan 3 angka random ke prefix code
  };
});

const products = generateProducts(3895);

fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
  if (err) return console.error('Error writing file', err);
  console.log('Products generated successfully!');
});
