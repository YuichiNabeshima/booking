
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.UserWhereInput) {
  const result = await prisma.user.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.UserWhereInput) {
  const result = await prisma.user.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.UserCreateManyInput) {
  const result = await prisma.user.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput }) {
  const result = await prisma.user.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.UserWhereUniqueInput) {
  const result = await prisma.user.delete({
    where: {
      ...args
    },
  });
  return result;
}
    