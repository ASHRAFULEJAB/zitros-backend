const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
// app.use(cors());
require("dotenv").config();

//middleware
app.use(express.json());
const port = process.env.PORT || 3000;
var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Zitros big Bazar is runnning...");
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next()
}); 

// mongoDB is connected Here
const uri =
  "mongodb+srv://coreDevDB:STE7m7E60nlNHStd@cluster0.dnw37y6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productCollection = client.db("bigBazarDB").collection("products");

    app.post("/products", async (req, res) => {
      const product = req.body;
      console.log(product);
      const result = await productCollection.insertOne(product);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`Zitros is running on ${port}`);
});
