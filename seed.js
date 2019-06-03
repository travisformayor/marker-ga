const db = require('./models');
const bcrypt = require('bcryptjs');

const usersData = [
  {name: "Test Person", username: "test", email: "test@test.com", password: '1234'},
];

const addSeed = async () => {
  try {
    // Delete all users
    const deleteUsers = await db.User.deleteMany({});
    console.log(`Deleted ${deleteUsers.deletedCount} users`); // 'deletedCount' is being returned by deleteMany

    // // Delete all cities
    // const deleteCities = await db.City.deleteMany();
    // console.log(`Deleted ${deleteCities.deletedCount} cities`);

    // // Delete all posts
    // const deletePosts = await db.Post.deleteMany();
    // console.log(`Deleted ${deletePosts.deletedCount} posts`);

    // Hash user passwords
    // forEach is async so difficult to use here
    // for..in and for..of are synchronous
    for (const user in usersData) {
      // const hashedPassword = bcrypt.hashSync(usersData[user].password, 10) // Synchronous
      const hashedPassword = await bcrypt.hash(usersData[user].password, 10)
      usersData[user].password = hashedPassword
    }
    console.log(`Hashed ${usersData.length} users`)
    console.log(`Example hash: ${usersData[usersData.length-1].password}`)

    // Create new users
    const newUsers = await db.User.create(usersData);
    console.log(`Created ${newUsers.length} users`);

    // // Create new cities
    // const newCities = await db.City.create(citiesData);
    // console.log(`Created ${newCities.length} cities`);

    // // Create new Posts
    // const newPosts = await db.Post.create(postsData);
    // console.log(`Created ${newPosts.length} posts`);

    // // Associate posts with random users and random cities
    // for (const post in newPosts) {
    //   const randomIndex = arr => Math.floor(Math.random() * arr.length);
    //   // console.log('Random Index = ', randomIndex(newPosts));

    //   newPosts[post].user_id = newUsers[randomIndex(newUsers)];
    //   newPosts[post].city_id = newCities[randomIndex(newCities)];

    //   // Save Post
    //   await newPosts[post].save();
    // }
    // console.log(`Associated ${newPosts.length} posts with users and cities`);
    // const examplePost = await db.Post.findOne();
    // console.log(`Example association on a post: city_id: ${examplePost.city_id}, user_id: ${examplePost.user_id}`);

  } catch(err) {
    console.log(err);
  }
  process.exit();
}

addSeed();