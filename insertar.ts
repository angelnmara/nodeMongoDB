import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://angelnmara:xxxxx@cluster0.0913r1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

interface Haiku {
  title: string;
  content: string;
}

const database = client.db("insertDB");
    // Specifying a Schema is optional, but it enables type hints on
    // finds and inserts
    const haiku = database.collection<Haiku>("haiku");

async function run() {
  try {    
    await insertar({
        title: "Este es mi cuarto registro",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
      });
    await insertaMuchos([
        {
            title: "Este es mi quinto registro",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
          },
          {
            title: "Este es mi 6o registro",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
          },
          {
            title: "Este es mi 7o registro",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
          }
      ]);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

async function insertar(haikuObject:Haiku){
    const result = await haiku.insertOne(haikuObject);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
}

async function insertaMuchos(haikuObjectList:Array<Haiku>){
    const result = await haiku.insertMany(haikuObjectList);
    console.log(`${result.insertedCount} documents were insertados`);
}
