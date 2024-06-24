
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.MailLogWhereInput) {
  const result = await prisma.mailLog.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.MailLogWhereInput) {
  const result = await prisma.mailLog.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.MailLogCreateManyInput) {
  const result = await prisma.mailLog.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.MailLogWhereUniqueInput, data: Prisma.MailLogUpdateInput }) {
  const result = await prisma.mailLog.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.MailLogWhereUniqueInput) {
  const result = await prisma.mailLog.delete({
    where: {
      ...args
    },
  });
  return result;
}
    