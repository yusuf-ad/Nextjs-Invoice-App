// code order matters
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🔥 Shutting down...");

  console.log(err);
});

const app = require("./app");
require("dotenv").config();

const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;

let server;

mongoose.connect(DATABASE).then(() => {
  console.log("App connected to Database");
});

server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});

// handle rejected promises
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 🔥 Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
