const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://bobprep:bobprep@cluster0.izicijl.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err.message, "<<<<< error");
  });
