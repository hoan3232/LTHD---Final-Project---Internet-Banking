import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma.js";

export async function all() {
  return await prisma.tK_TT.findMany();
}

export async function findTransByMaNgGui(name) {
  return await prisma.dS_CK.findMany({
    where: {
      Ma_Ng_Gui: name 
    },
  });
}

export async function createUser(user) {
  return await prisma.dS_TK.create({data:user});
}

export async function topupAccount(id, amount) {
  return await prisma.tK_TT.update({
    where: {
      Id: id, 
    },
    data: {
      So_Du: {
        increment: parseFloat(amount)
      }
    },
  });
}

export default {
  all,
  findTransByMaNgGui,
  createUser,
  topupAccount
};
