
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.BookingCapacityWhereInput) {
  const result = await prisma.bookingCapacity.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.BookingCapacityWhereInput) {
  const result = await prisma.bookingCapacity.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.BookingCapacityCreateManyInput) {
  const result = await prisma.bookingCapacity.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.BookingCapacityWhereUniqueInput, data: Prisma.BookingCapacityUpdateInput }) {
  const result = await prisma.bookingCapacity.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.BookingCapacityWhereUniqueInput) {
  const result = await prisma.bookingCapacity.delete({
    where: {
      ...args
    },
  });
  return result;
}
    