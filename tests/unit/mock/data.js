const correctProduct = { name: 'PlayStation 5' };
const incorrectProduct = { name: 'PS5' };

const products = [
  { id: 1, name: 'PlayStation 5' },
  { id: 2, name: 'Xbox Series X' }
];

const saleWithProducts = {
  id: 1,
  itemsSold: products,
};

const updatedProducts = [
  { productId: 1, quantity: 5 },
  { productId: 2, quantity: 3 }
];

const saleWithUpdatedProducts = {
  saleId: 1,
  itemsUpdated: updatedProducts
}

const salesWithProducts = [
  {
    saleId: 1,
    date: "2022-07-05T19:05:53.479Z",
    productId: 5,
    quantity: 2
  },
  {
    saleId: 2,
    date: "2022-07-05T19:05:53.479Z",
    productId: 3,
    quantity: 1
  }
];

const productsFromASale = [
  {
    date: "2022-07-05T19:57:21.000Z",
    productId: 1,
    quantity: 5
  },
  {
    date: "2022-07-05T19:57:21.000Z",
    productId: 2,
    quantity: 10
  }
];

module.exports = {
  correctProduct,
  incorrectProduct,
  products,
  saleWithProducts,
  salesWithProducts,
  productsFromASale,
  updatedProducts,
  saleWithUpdatedProducts,
};
