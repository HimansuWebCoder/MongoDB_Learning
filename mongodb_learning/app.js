const { MongoClient } = require("mongodb");

async function run() {
  const uri = "mongodb+srv://mongodb_test:mongodb9861@cluster0.yr6qm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);
  await client.connect();

  const dbName = 'Fruit_Store';
  const collectionName = 'Fruits'; 

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const fruits = [
    { name: "Mango" },
    { name: "Orange" },
    { name: "Lemon" },
    { name: "Lichi" }
  ];

  // INSERT OPERATION
  try {
    const insertManyResult = await collection.insertMany(fruits);
    console.log(insertManyResult);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }

  // FIND OPERATION
  try {
    const findFruits = await collection.find({});
    const findMyFruits = await findFruits.toArray();
    findMyFruits.forEach(fruit => {
      console.log("All Fruits:", fruit);
    });
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }

  // UPDATE OPERATION
  try {
    const findOneQuery = { name: "Orange" };  // Define your query
    const updateDoc = { $set: { name: "Updated Orange" } };  // Define the update operation
    const updateOptions = { returnDocument: 'after' };  // Optional: Return the updated document

    const updateResult = await collection.findOneAndUpdate(
      findOneQuery,
      updateDoc,
      updateOptions
    );
    console.log(`Here is the updated document:\n${JSON.stringify(updateResult.value)}\n`);
  } catch (err) {
    console.error(`Something went wrong trying to update one document: ${err}\n`);
  }

  // DELETE OPERATION
  try {
    const deleteQuery = { name: "Orange" };  // Directly pass the filter to delete
    const deleteResult = await collection.deleteOne(deleteQuery);  // Use deleteOne or deleteMany
    console.log(`Deleted ${deleteResult.deletedCount} document(s)\n`);
  } catch (err) {
    console.error(`Something went wrong trying to delete documents: ${err}\n`);
  }

  // Make sure to call close() on your client to perform cleanup operations
  await client.close();
}
run().catch(console.dir);
