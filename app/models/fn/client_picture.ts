
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.ClientPictureWhereInput) {
  const result = await prisma.clientPicture.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.ClientPictureWhereInput) {
  const result = await prisma.clientPicture.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.ClientPictureCreateManyInput) {
  const result = await prisma.clientPicture.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.ClientPictureWhereUniqueInput, data: Prisma.ClientPictureUpdateInput }) {
  const result = await prisma.clientPicture.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.ClientPictureWhereUniqueInput) {
  const result = await prisma.clientPicture.delete({
    where: {
      ...args
    },
  });
  return result;
}
    