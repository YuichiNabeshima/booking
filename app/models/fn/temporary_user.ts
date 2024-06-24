
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.TemporaryUserWhereInput) {
  const result = await prisma.temporaryUser.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.TemporaryUserWhereInput) {
  const result = await prisma.temporaryUser.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.TemporaryUserCreateManyInput) {
  const result = await prisma.temporaryUser.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.TemporaryUserWhereUniqueInput, data: Prisma.TemporaryUserUpdateInput }) {
  const result = await prisma.temporaryUser.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.TemporaryUserWhereUniqueInput) {
  const result = await prisma.temporaryUser.delete({
    where: {
      ...args
    },
  });
  return result;
}
    