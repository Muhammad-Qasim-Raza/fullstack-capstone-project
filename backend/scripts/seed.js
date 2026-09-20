require("dotenv").config();
const { connectToDatabase, closeDatabase } = require("../db");

const raw = [
  ["Wooden Study Desk","Furniture"],["Office Chair","Furniture"],["Microwave Oven","Appliances"],
  ["Electric Kettle","Appliances"],["Children Books Set","Books"],["Programming Books","Books"],
  ["Winter Jacket","Clothing"],["School Backpack","Clothing"],["Table Lamp","Home"],
  ["Kitchen Utensils","Home"],["Bicycle","Sports"],["Yoga Mat","Sports"],
  ["Plant Pots","Garden"],["Gardening Tools","Garden"],["Android Phone","Electronics"],
  ["USB Keyboard","Electronics"]
];

const items = raw.map(([title, category]) => ({
  title, category,
  description: `${title} available for reuse through GiftLink.`,
  location: "Karachi",
  available: true,
  comments: [],
  createdAt: new Date()
}));

(async () => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("gifts").insertMany(items);
    console.log("inserted_items");
    console.log(`Inserted ${result.insertedCount} documents into MongoDB`);
    console.log("Expected: 16");
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
})();
