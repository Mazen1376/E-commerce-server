import mongoose from "mongoose";
import 'dotenv/config';
import { productModel } from "./src/db/models/productModel.js";

const sampleProducts = [
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling headphones with Auto NC Optimizer, crystal clear hands-free calling, and Alexa voice control.",
    quantity: 50,
    category: "Electronics",
    price: 348.00,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Minimalist Leather Backpack",
    description: "Handcrafted from full-grain leather, featuring a padded laptop sleeve and ergonomic straps for ultimate comfort.",
    quantity: 120,
    category: "Fashion",
    price: 185.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ember Temperature Control Smart Mug",
    description: "Keep your coffee perfectly hot. Set an exact drinking temperature so your coffee is never too hot, or too cold.",
    quantity: 85,
    category: "Home",
    price: 149.95,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Apple Watch Series 9",
    description: "Smarter. Brighter. Mightier. With an S9 chip, a super-bright display, and a magical new way to interact without touching the screen.",
    quantity: 40,
    category: "Electronics",
    price: 399.00,
    image: "https://images.unsplash.com/photo-1434493789847-2f02bca1c390?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ceramic Minimalist Vase",
    description: "A beautiful matte ceramic vase perfect for fresh or dried flowers. Adds an elegant touch to any living space.",
    quantity: 200,
    category: "Home",
    price: 34.50,
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Premium Mechanical Keyboard",
    description: "Tactile switches, customizable RGB backlighting, and a premium aluminum frame for the ultimate typing experience.",
    quantity: 75,
    category: "Electronics",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Ethically made from 100% organic cotton. Unbelievably soft, breathable, and designed for a perfect fit.",
    quantity: 300,
    category: "Fashion",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Aesop Resurrection Hand Wash",
    description: "A gentle formulation containing oils of Orange, Rosemary and Lavender to effectively cleanse the hands without drying them out.",
    quantity: 150,
    category: "Beauty",
    price: 41.00,
    image: "https://images.unsplash.com/photo-1626084967396-e8d128d5bbec?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Mid-Century Modern Lounge Chair",
    description: "Iconic design meets supreme comfort. Features sustainably sourced walnut veneer and top-grain leather upholstery.",
    quantity: 15,
    category: "Furniture",
    price: 850.00,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Professional Camera Lens 50mm",
    description: "Capture stunning portraits with beautiful bokeh. A must-have prime lens for professional and enthusiast photographers alike.",
    quantity: 25,
    category: "Electronics",
    price: 549.00,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Stainless Steel Insulated Water Bottle",
    description: "Keeps beverages cold for 24 hours or hot for 12 hours. BPA-free, leak-proof design perfect for active lifestyles.",
    quantity: 400,
    category: "Accessories",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Wireless Charging Pad",
    description: "Sleek and slim design. Supports fast charging up to 15W for compatible smartphones and wireless earbuds.",
    quantity: 180,
    category: "Electronics",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Classic Aviator Sunglasses",
    description: "Timeless style with polarized lenses that provide 100% UV protection and reduce glare for optimal clarity.",
    quantity: 110,
    category: "Fashion",
    price: 155.00,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Artisan Coffee Beans - Single Origin",
    description: "Light roast with notes of jasmine, blueberry, and honey. Sourced from sustainable farms in Ethiopia.",
    quantity: 250,
    category: "Food",
    price: 24.00,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Smart Home Security Camera",
    description: "1080p HD video, two-way audio, and advanced motion detection. Keep an eye on your home from anywhere via the app.",
    quantity: 90,
    category: "Electronics",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=800&q=80"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to DB for seeding.");
    
    // Clear existing products if needed, but here we just add them
    // await productModel.deleteMany({});
    
    await productModel.insertMany(sampleProducts);
    console.log("Successfully seeded 15 products!");
    
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
