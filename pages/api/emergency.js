import { MongoClient } from 'mongodb'

async function connectToDatabase() {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(process.env.MONGO_DB);
    const collection = db.collection('emergencies');
    return collection;
  }

export default async function handler(req, res) {
    const collection = await connectToDatabase();
    const data = await collection.find().toArray();
    res.status(200).json(data);
  }

export function getEmergencies(){
  const data = [{"_id":"641e466b44b49466b1c2d31c","isActive":"No","date":"3/16/24","location":"SU","title":"Faint","time":"20","timeEnd":"4:02 PM","timeStart":"3:42 PM"}];
  return data; 
}