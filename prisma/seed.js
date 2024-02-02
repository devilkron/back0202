const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const password = bcrypt.hashSync("123456");
const userData = [
  { username: "Andrew", password, email: "Andrew@spiderman.com" },
  { username: "Tom", password, email: "Tom@spiderman.com" },
  { username: "Toby", password, email: "Toby@spiderman.com" },
];

const todoData = [
  { title: "HTML", duedate: new Date(), user_id: 1 },
  { title: "CSS", duedate: new Date(), user_id: 1 },
  { title: "JS", duedate: new Date(), user_id: 2 },
  { title: "React", duedate: new Date(), user_id: 3 },
];

const run = async () => {
  // await prisma.todo.deleteMany({});
  // await prisma.user.deleteMany({});

  await prisma.user.createMany({
    data: userData,
  });

  await prisma.todo.createMany({
    data: todoData,
  });
};

run();
