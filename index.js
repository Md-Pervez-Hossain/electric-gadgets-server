const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// userName : gadgets_userName
// password : x3W4KT5TFR1k95BV

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://gadgets_userName:x3W4KT5TFR1k95BV@cluster0.zr5yxev.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const gadgetsCollection = client
      .db("ElectricGadgets")
      .collection("gadgetsCollection");
    const cartPageProducts = client
      .db("ElectricGadgets")
      .collection("cartPageProducts");
    const wishlistCollection = client
      .db("ElectricGadgets")
      .collection("wishlistCollection");
    console.log("dataBase Connected");
    app.post("/addProducts", async (req, res) => {
      const product = req.body;
      const result = await gadgetsCollection.insertOne(product);
      res.send(result);
    });

    app.post("/wishlist", async (req, res) => {
      const wishlist = req.body;
      const result = await wishlistCollection.insertOne(wishlist);
      res.send(result);
      console.log(wishlist);
    });

    app.get("/wishlist", async (req, res) => {
      const query = {};
      const cursor = await wishlistCollection.find(query).toArray();
      res.send(cursor);
    });

    app.post("/cartpage", async (req, res) => {
      const cartProduct = req.body;
      const result = await cartPageProducts.insertOne(cartProduct);
      res.send(result);
    });
    app.get("/cartpage", async (req, res) => {
      const query = {};
      const cursor = await cartPageProducts.find(query).toArray();
      res.send(cursor);
    });

    app.get("/cartpage/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await cartPageProducts.findOne(query);
      res.send(result);
      console.log(result);
    });
    // app.delete("/cartpage/:id", async (req, res) => {
    //   const id = req.params.id;
    //   console.log(id);
    //   const query = { _id: new ObjectId(id) };
    //   const result = await cartPageProductsCollection.deleteOne(query);
    //   res.send(result);
    //   console.log(result);
    // });

    app.delete("/cartpage/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const result = await cartPageProducts.deleteOne(filter);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = gadgetsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await gadgetsCollection.findOne(query);
      res.send(result);
    });
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { productCategory: id };
      const result = await gadgetsCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("hello i am from node server");
});
app.listen(port, () => {
  console.log(port, "Node Server Running");
});
