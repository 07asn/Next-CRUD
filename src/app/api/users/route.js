import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    where: { deleted: false },
    orderBy: { createdAt: 'desc' },
  });

  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return Response.json(user);
}
