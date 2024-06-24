
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.CourseWhereInput) {
  const result = await prisma.course.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.CourseWhereInput) {
  const result = await prisma.course.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.CourseCreateManyInput) {
  const result = await prisma.course.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.CourseWhereUniqueInput, data: Prisma.CourseUpdateInput }) {
  const result = await prisma.course.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.CourseWhereUniqueInput) {
  const result = await prisma.course.delete({
    where: {
      ...args
    },
  });
  return result;
}
    