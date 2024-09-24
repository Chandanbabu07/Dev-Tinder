// const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://chandanbabu705:Chandan17@devtinder.n6p6i.mongodb.net/devtinder"
  );
};

module.exports = connectDB;

// const client = new MongoClient(url);

// const dbName = "Testing";

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   const collection = db.collection("User");

//   const data = {
//     firstname: "Priya",
//     lastname: "Gowda",
//     email: "priyagowda419@gmail.com",
//     city: "Mysore",
//   };

//   //   const insertResult = await collection.insertMany([data]);
//   //   console.log('Inserted documents =>', insertResult);

//   //   const updateResult = await collection.updateOne(
//   //     { _id: new ObjectId("66eeb8c6b69c49765bceb495") },
//   //     { $set: { firstname: "Priyanka", email: "priyankagowda419@gmail.com" } }
//   //   );
//   //   console.log("Updated documents =>", updateResult);

// //   const deleteResult = await collection.deleteMany({
// //     _id: new ObjectId("66eeb8c6b69c49765bceb495"),
// //   });
// //   console.log("Deleted documents =>", deleteResult);

//   // the following code examples can be pasted here...
//   const findResult = await collection.find({}).toArray();
//   console.log("Found documents =>", findResult);

//   return "done.";
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
