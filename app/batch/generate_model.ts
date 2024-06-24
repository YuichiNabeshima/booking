import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { capitalize } from '~/utilis/capitalize';

const prisma = new PrismaClient();

(async function() {
  const result: {tablename: string}[] = await prisma.$queryRaw`
    select
      tablename
    from
      pg_tables
    where
      schemaname not in ( 'pg_catalog','information_schema' )
    order by
      tablename;
  `;
  const tables = result.filter(item => item.tablename !== '_prisma_migrations').map(item => item.tablename.charAt(0).toLowerCase() + item.tablename.slice(1).toLowerCase());

  fs.rmdirSync('app/models/fn/', { recursive: true });
  fs.mkdirSync('app/models/fn/', { recursive: true });

  tables.forEach( table => {
    const pascalTable = capitalize(table);
    const camelTable = capitalize(table, true);


    fs.writeFile(`app/models/fn/${table}.ts`, `
// Do not Edit
import { Prisma } from '@prisma/client';
import { prisma } from '~/lib/prisma.server';

export async function fetch(args?: Prisma.${pascalTable}WhereInput) {
  const result = await prisma.${camelTable}.findFirst({
    where: {
      ...args
    }
  });
  return result;
}

export async function fetchAll(args?: Prisma.${pascalTable}WhereInput) {
  const result = await prisma.${camelTable}.findMany({
    where: {
      ...args
    }
  });
  return result;
}

export async function create(args: Prisma.${pascalTable}CreateManyInput) {
  const result = await prisma.${camelTable}.create({
    data: {
      ...args
    }
  });
  return result;
}

export async function update(args: { where: Prisma.${pascalTable}WhereUniqueInput, data: Prisma.${pascalTable}UpdateInput }) {
  const result = await prisma.${camelTable}.update({
    where: {
      ...args.where
    },
    data: {
      ...args.data
    }
  });
  return result;
}

export async function remove(args: Prisma.${pascalTable}WhereUniqueInput) {
  const result = await prisma.${camelTable}.delete({
    where: {
      ...args
    },
  });
  return result;
}
    `, () => {});
  } );
})();
