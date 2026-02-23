
import bcrypt from 'bcrypt';
import { prisma } from '../src/Database/db.js';

async function main() {
  console.log('Seeding database...');

  await prisma.userTask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('123456', 10);

  const user1 = await prisma.user.create({
    data: {
      name: 'Hala',
      email: 'hala@example.com',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Ahmad ',
      email: 'Ahmad@example.com',
      password: hashedPassword,
    },
  });
    const user3 = await prisma.user.create({
    data: {
      name: 'Ali',
      email: 'Ali@example.com',
      password: hashedPassword,
      role : 'ADMIN'
    },
  });

  const task1 = await prisma.task.create({
    data: {
      title: 'build Api',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'build UI',
      status: 'PENDING',
      priority: 'MEDIUM',
    },
  });
   const task3 = await prisma.task.create({
    data: {
      title: 'build Database',
      status: 'PENDING',
      priority: 'HIGH',
    },
  });

  // Assign users to tasks
  await prisma.userTask.createMany({
    data: [
      { userId: user1.id, taskId: task1.id },
      { userId: user2.id, taskId: task1.id },
      { userId: user1.id, taskId: task2.id },
      { userId: user2.id, taskId: task3.id },
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });