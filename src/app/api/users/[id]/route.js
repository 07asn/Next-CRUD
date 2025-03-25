import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  const updated = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return Response.json(updated);
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  const deleted = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      deleted: true,
    },
  });

  return Response.json({ message: 'User soft deleted', user: deleted });
}
