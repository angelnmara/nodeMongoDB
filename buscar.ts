import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://angelnmara:sD7mLAZ0Bi0P0LPK@cluster0.0913r1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

interface IMDB {
  rating: number;
  votes: number;
  id: number;
}

export interface Movie {
  title: string;
  year: number;
  released: Date;
  plot: string;
  type: "movie" | "series";
  imdb: IMDB;
}

const database = client.db("sample_mflix");
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
const movies = database.collection<Movie>("movies");

type MovieSummary = Pick<Movie, "title" | "imdb">;

async function run(): Promise<void> {
  try {
    //await BuscarUno("The Room");    
    await Buscar();
  } finally {
    await client.close();
  }
}
run().catch(console.dir);       

async function Buscar(){
    const query = {runtime:{$lt:5}}
    const cursor = movies.find(query, {sort:{title:1}, projection:{_id:0, title:1, imdb:1, runtime: 1}})
    if((await movies.countDocuments(query))===0){
        console.warn("No documents found");
    }
    for await(const doc of cursor){
        console.dir(doc);
    }
}

async function BuscarUno(titulo:string){    
    const movie = await movies.findOne<MovieSummary>({ title: titulo }, {
        sort: { rating: -1 },
        projection: { _id: 0, title: 1, imdb: 1 },
      });
    console.log(movie);
}
