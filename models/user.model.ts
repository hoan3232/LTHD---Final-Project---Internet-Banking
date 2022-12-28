import { prisma } from "../prisma/prisma.js";

export async function all() {
  return await prisma.dS_TK.findMany();
}

export async function findById(id) {
  return await prisma.dS_TK.findUnique({
    where: {
      Id: id,
    },
  });
}

export async function findByName(name) {
  return await prisma.dS_TK.findMany({
    where: {
      Ten_DK: name,
    },
  });
}

export default {
  all,
  findById,
  findByName,
};
