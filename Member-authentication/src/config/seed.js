const faker = require("@faker-js/faker").faker;

const Member = require("../models/member");
const Brand = require("../models/brand");
const Comment = require("../models/comment");
const Watch = require("../models/watch");

async function seedDatabase() {
  try {
    // Generate fake data for members
    const members = [];
    for (let i = 0; i < 10; i++) {
      const member = new Member({
        memberName: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.finance.accountName(),
        YOB: faker.number.int({ min: 1900, max: 2021 }),
        isAdmin: false,
      });
      members.push(member);
    }

    // Generate fake data for brands
    const brands = [];
    for (let i = 0; i < 10; i++) {
      const brand = new Brand({
        brandName: faker.company.name(),
      });
      brands.push(brand);
    }

    // Generate fake data for watches and comments
    const watches = [];
    for (let i = 0; i < 20; i++) {
      const watch = new Watch({
        watchName: faker.commerce.productName(),
        image: faker.image.urlLoremFlickr({ category: "wristwatch" }),
        price: faker.finance.amount({ min: 30, max: 500 }),
        Automatic: faker.datatype.boolean(),
        watchDescription: faker.lorem.paragraphs(),
        brand: brands[Math.floor(Math.random() * brands.length)]._id,
      });

      const comment = new Comment({
        rating: faker.number.int({ min: 1, max: 5 }),
        content: faker.lorem.paragraph(),
        author: members[Math.floor(Math.random() * members.length)]._id,
      });

      watch.comments.push(comment);
      watches.push(watch);
    }

    // Save all generated data to the database
    await Promise.all([
      Member.insertMany(members),
      Brand.insertMany(brands),
      Watch.insertMany(watches),
      Comment.insertMany(watches.flatMap((watch) => watch.comments)),
    ]);

    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

module.exports = seedDatabase;
