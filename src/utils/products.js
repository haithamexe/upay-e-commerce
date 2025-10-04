const categories = [
  {
    id: 1,
    title: "Category 1",
    imageUrl: "https://i.imgur.com/4lTaHfF.jpeg",
  },
  {
    id: 2,
    title: "Category 2",
    imageUrl: "https://i.imgur.com/qNOjJje.jpeg",
  },
  {
    id: 3,
    title: "Category 3",
    imageUrl: "https://i.imgur.com/w3Y8NwQ.jpeg",
  },
  {
    id: 4,
    title: "Category 4",
    imageUrl: "https://i.imgur.com/ItHcq7o.jpeg",
  },
  { id: 5, title: "Category 5", imageUrl: "https://i.imgur.com/axsyGpD.jpeg" },

  { id: 7, title: "Category 7", imageUrl: "https://i.imgur.com/Qphac99.jpeg" },
];

const products = [
  {
    id: 8,
    title: "Apple Watch",
    imageUrl: "https://i.imgur.com/1ttYWaI.jpeg",
    price: 9.99,
  },

  {
    id: 9,
    title: "Mouse",
    imageUrl: "https://i.imgur.com/w3Y8NwQ.jpeg",
    price: 19.99,
  },
  {
    id: 10,
    title: "Headphone",
    imageUrl: "https://i.imgur.com/yVeIeDa.jpeg",
    price: 49.99,
  },
  {
    id: 11,
    title: "Toaster",
    imageUrl: "https://i.imgur.com/keVCVIa.jpeg",
    price: 24.99,
  },
];

const productsWithCards = [
  {
    id: 12,
    title: "Apple Watch",
    imageUrl: "https://i.imgur.com/1ttYWaI.jpeg",
    price: 9.99,
  },
  {
    id: 13,
    title: "Headphone",
    imageUrl: "https://i.imgur.com/YaSqa06.jpeg",
    price: 99,
  },
  {
    id: 14,
    title: "Joystick Dual Shock",
    imageUrl: "https://i.imgur.com/ZANVnHE.jpeg",
    price: 9.99,
  },
  {
    id: 15,
    title: "Acer Laptop",
    imageUrl: "https://i.imgur.com/ItHcq7o.jpeg",
    price: 399,
  },
  {
    id: 16,
    title: "Wired Headphone",
    imageUrl: "https://i.imgur.com/5B8UQfh.jpeg",
    price: 29.99,
  },
  {
    id: 17,
    title: "Mouse",
    imageUrl: "https://i.imgur.com/w3Y8NwQ.jpeg",
    price: 19.99,
  },
  {
    id: 18,
    title: "Headphone",
    imageUrl: "https://i.imgur.com/yVeIeDa.jpeg",
    price: 49.99,
  },
  {
    id: 19,
    title: "Toaster",
    imageUrl: "https://i.imgur.com/keVCVIa.jpeg",
    price: 24.99,
  },
];

const allProducts = [...products, ...productsWithCards];
export { categories, products, productsWithCards, allProducts };
