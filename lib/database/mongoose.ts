// In the Cases of React the Connection with the Moongoose Databases need to make connection
// at the call of each function of each api requriements.....

import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL=process.env.MONGODB_URL

interface MongooseConnection{
    conn: Mongoose | null ;
    promise:Promise<Mongoose> | null ;
}

let cache:MongooseConnection=(global as any).mongoose

if(!cache){
    cache=(global as any).mongoose ={ 
        conn:null,
        promise:null
    }
}

export const connectToDatabase = async() =>{
    if(cache.conn){
        return cache.conn
    }

    if(!MONGODB_URL) throw new Error('Mongo DB Url Misssing...');

    cache.promise=cache.promise || mongoose.connect(
        MONGODB_URL,
        {
            dbName:'imaginify',
            bufferCommands:false,
        }
    )

    cache.conn=await cache.promise;
    return cache.conn;
}