const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    //fetch data from db (all data)
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollections.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //to delete you must have to define query carefull. Also id is stored id db as objectId. So Import that id first.

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollections.deleteOne(query);
      console.log(result);
      res.send(result);
    });

    //update user

    /* 
        to update user we can do in two method PUT and PATCH 
        put: when we don't know that data is present. If not present put creates autometically one. 
        patch: only updates data when data is present. 

    */
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const result = await userCollections.findOne(query);
      res.send(result);
    });

    //update user
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };

      const user = req.body;

      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };

      const result = await userCollections.updateOne(
        filter,
        updatedUser,
        options
      );

      res.send(result);
      console.log(user);
    });

    //Create a new data in db
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollections.insertOne(user);
      console.log(result);
      res.send(result);
    });
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
