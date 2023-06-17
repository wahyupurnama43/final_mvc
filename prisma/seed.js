const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const data = [
  {
    username : 'admin',
    email:'admin@gmail.com',
    password :'password',
    role     : 'admin'
  },
];

async function main() {
  data.forEach(async (users) => {
    await prisma.users.create({
      data: shoe,
    });
  });
  console.log("Seed data success");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
