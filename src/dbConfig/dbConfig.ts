import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MONOGO DB CONNECTED");
    });
    connection.on("error", (error) => {
      console.log("ERROR IN CONNECTING WITH DB" + error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connectin the DB ");
    alert(error);
    console.log(error);
  }
}
