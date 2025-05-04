import mongoose from "mongoose";

//function to connect to the MongoDB database

const connectDB = async()=>{

    mongoose.connection.on('connected', ()=> console.log('Database connected'))

    await mongoose.connect(process.env.MONGO_URI)
}

export default connectDB