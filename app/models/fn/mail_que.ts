
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.MailQueWhereInput) {
  const result = await prisma.mailQue.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.MailQueWhereInput) {
  const result = await prisma.mailQue.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.MailQueCreateManyInput) {
  const result = await prisma.mailQue.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.MailQueWhereUniqueInput, data: Prisma.MailQueUpdateInput }) {
  const result = await prisma.mailQue.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.MailQueWhereUniqueInput) {
  const result = await prisma.mailQue.delete({
    where: {
      ...args
    },
  });
  return result;
}
    