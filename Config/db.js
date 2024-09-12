const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDb connected  ${connect.connection.host}`);
  } catch (error) {
    console.log("Error message");
  }
};
module.exports = connectDb;
