
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.ClientWhereInput) {
  const result = await prisma.client.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.ClientWhereInput) {
  const result = await prisma.client.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.ClientCreateManyInput) {
  const result = await prisma.client.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.ClientWhereUniqueInput, data: Prisma.ClientUpdateInput }) {
  const result = await prisma.client.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.ClientWhereUniqueInput) {
  const result = await prisma.client.delete({
    where: {
      ...args
    },
  });
  return result;
}
    