const mongoose = require("mongoose");

exports.mongo_connection = () => {
  mongoose.set("debug", true);
  try {
    console.log(process.env.DB_MONGO_URL);
    mongoose.connect(
      process.env.DB_MONGO_URL || 'mongodb+srv://Vrushik_72:Vrushik_72@cluster0.lnuveur.mongodb.net/Letter_Box',
      { useNewUrlParser: true, useFindAndModify: false,family :4,   useUnifiedTopology: true , useCreateIndex:true },
      
      function (err, db) {
        if (err) {
          console.log("MongoDB Database Connection Error", err);
        } else {
          console.log("MongoDB Connection Done!!");
        }
      }
    );
  } catch (e) {
    console.log("MongoDB Connection Error");
  }
};
