const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
    await prisma.setting.upsert({
        where: { key: 'salary' },
        update: {},
        create: {
            key: "salary",
            value: "0",
            type: "NUMBER",
        },
    });
    await prisma.setting.upsert({
        where: { key: 'cash' },
        update: {},
        create: {
            key: "cash",
            value: "0",
            type: "NUMBER",
        },
    });
    console.log("Successfully created initial settings");
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })