import mongoose from "mongoose";

mongoose.set("strictQuery", true);
const dbname = 'meal_tracker'
const url = `mongodb+srv://gabrielminatto3:${process.env.DB_PWD}@mealtrackerdb.bxk1lje.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const connect = async () => {
    return await mongoose.connect(url);
}

const disconnect = async () => {
    return await mongoose.disconnect();
}

const database = {
    connect,
    disconnect
}

export default database