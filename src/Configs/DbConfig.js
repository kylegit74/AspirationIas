import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

async function Connection()
{

    try{
       mongoose.connect(process.env.DB_URL);
       console.log('MongoDb is connected ');

    }catch(error)
    {
       console.log('error',error)
    }
}
export default Connection;