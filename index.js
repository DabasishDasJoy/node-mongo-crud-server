const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//database

// user: dbUser1
// pass: kcn9Y4jMLFEuWIGb

const uri =
  "mongodb+srv://dbuser2:kM1RkIa6JfPWkwg1@cluster0.mj0nqa8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollections = client.db("NodeMongoCrud").collection("users");
    const user = { name: "dabasish", email: "heldfkl@gmail.com" };

    const result = await userCollections.insertOne(user);
    console.log(result);
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Mongo crud app is running");
});

app.listen(port, () => {
  console.log("Mongo crud is listenign to ", port);
});
