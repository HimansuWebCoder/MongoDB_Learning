const { MongoClient } = require("mongodb");
require("dotenv").config()

const uri = process.env.MONGO_URL;

// Create a new fruit
async function createFruit(fruit) {
  const client = new MongoClient(uri);
  await client.connect();

  const dbName = 'Fruit_Store';
  const collectionName = 'Fruits'; 

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  try {
    const insertResult = await collection.insertOne(fruit); // Insert a single document
    if (insertResult.acknowledged) {
      return {
        success: true,
        message: "Fruit created successfully",
        fruit: insertResult,
      };
    } else {
      return { success: false, message: "Failed to create fruit" };
    }
  } catch (err) {
    console.error(`Error during create operation: ${err}`);
    return { success: false, message: `Error: ${err.message}` };
  } finally {
    await client.close();
  }
}

// Get all fruits
async function getAllFruits() {
  const client = new MongoClient(uri);
  await client.connect();

  const dbName = 'Fruit_Store';
  const collectionName = 'Fruits'; 

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  try {
    const fruits = await collection.find({}).toArray(); // Returns an array of all fruits

    if (fruits.length > 0) {
      return {
        success: true,
        message: "All fruits fetched successfully",
        fruits: fruits
      };
    } else {
      return { success: false, message: "No fruits found" };
    }
  } catch (err) {
    console.error(`Error during find operation: ${err}`);
    return { success: false, message: `Error: ${err.message}` };
  } finally {
    await client.close();
  }
}

// Update a fruit
async function updateFruit(name, updatedFruit) {
  const client = new MongoClient(uri);
  await client.connect();

  const dbName = 'Fruit_Store';
  const collectionName = 'Fruits'; 

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  try {
    const updateResult = await collection.updateOne(
      { name: name }, // Find fruit by name
      { $set: updatedFruit } // Update the fruit with the new data
    );

    if (updateResult.modifiedCount > 0) {
      return {
        success: true,
        message: "Fruit updated successfully",
        updatedFruit: updatedFruit
      };
    } else {
      return { success: false, message: "No matching fruit found or no changes made" };
    }
  } catch (err) {
    console.error(`Error during update operation: ${err}`);
    return { success: false, message: `Error: ${err.message}` };
  } finally {
    await client.close();
  }
}

// Delete a fruit
async function deleteFruit(name) {
  const client = new MongoClient(uri);
  await client.connect();

  const dbName = 'Fruit_Store';
  const collectionName = 'Fruits'; 

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  try {
    const deleteResult = await collection.deleteOne({ name: name }); // Delete fruit by name

    if (deleteResult.deletedCount > 0) {
      return {
        success: true,
        message: "Fruit deleted successfully"
      };
    } else {
      return { success: false, message: "No fruit found with the given name" };
    }
  } catch (err) {
    console.error(`Error during delete operation: ${err}`);
    return { success: false, message: `Error: ${err.message}` };
  } finally {
    await client.close();
  }
}

module.exports = { createFruit, getAllFruits, updateFruit, deleteFruit };
