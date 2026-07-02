import { prisma } from './src/lib/prisma';

async function test() {
  try {
    const subjects = await prisma.subject.findMany();
    console.log("Success:", subjects);
  } catch (e) {
    console.error("Failed:", e);
  }
}
test();
