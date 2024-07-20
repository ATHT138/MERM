const mongoose = require("mongoose");
const seedDatabase = require("./seed");
const Member = require("../models/member");
const bcrypt = require("bcrypt");

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    console.log("MongoDB connected...");

    // await insertInitialData();
    // await seedDatabase().then(() => {
    //   mongoose.connection.close();
    // });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const insertInitialData = async () => {
  try {
    // Check if there are any members already
    const existingMembers = await Member.find();
    if (existingMembers.length === 0) {
      // Hash password
      const hashedPassword = await bcrypt.hash("123456", 10); // Adjust the hashing options as needed

      // Create initial member data
      const newMemberData = {
        memberName: "admin",
        password: hashedPassword,
        name: "Joe Biden",
        YOB: 1990,
        isAdmin: true,
      };

      // Insert into database
      await Member.create(newMemberData);

      console.log("Initial member data inserted.");
    } else {
      console.log("Initial member data already exists.");
    }
  } catch (error) {
    console.error("Error inserting initial member data:", error);
  }
};
module.exports = connectDB;
