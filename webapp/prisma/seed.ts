import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const beers = await prisma.beer.createMany({
    data: [
      {
        name: "Pilsner",
        description: "A light, crisp and bitter beer with a dry finish.",
        price: 5.0,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/da/Pilsner_urquell_mug.jpg",
      },
      {
        name: "IPA",
        description: "A fruity and hoppy beer with a higher alcohol content.",
        price: 6.0,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/Fuller%27s_India_pale_ale.jpg",
      },
    ],
  });

  const tables = await prisma.table.createMany({
    data: [
      {
        status: true,
        capacity: 70,
      },
      {
        status: true,
        capacity: 40,
      },
      {
        status: false,
        capacity: 100,
      },
    ],
  });
  console.log(beers, tables);
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
