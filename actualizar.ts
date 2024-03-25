// Update a document

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string
const uri = "mongodb+srv://angelnmara:xxxxx@cluster0.0913r1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

// Define the Movie interface
interface Movie {
  plot: string;
  title: string;
}

const database = client.db("sample_mflix");
const movies = database.collection<Movie>("movies");

async function run() {
  try {    
    await actualizar();
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
// Run the program and print any thrown errors
run().catch(console.dir);

async function actualizar(){
    /* Update a document that has the title "Random Harvest" to have a
    plot field with the specified value */
    const result = await movies.updateOne(
        { title: "Random Harvest" },
        {
          $set: {
            plot: `A harvest of random numbers, such as: ${Math.random()}`,
          },
        },
        /* Set the upsert option to insert a document if no documents
        match the filter */
        { upsert: true }
      );
  
      // Print the number of matching and modified documents
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );
}