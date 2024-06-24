
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.BookingWhereInput) {
  const result = await prisma.booking.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.BookingWhereInput) {
  const result = await prisma.booking.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.BookingCreateManyInput) {
  const result = await prisma.booking.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.BookingWhereUniqueInput, data: Prisma.BookingUpdateInput }) {
  const result = await prisma.booking.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.BookingWhereUniqueInput) {
  const result = await prisma.booking.delete({
    where: {
      ...args
    },
  });
  return result;
}
    