import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;

try{
    conn = await client.connect()
} catch(error){
    console.error(error)
}

let db = conn.db("CourseManagement");

export default db;