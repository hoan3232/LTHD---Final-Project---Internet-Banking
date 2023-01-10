import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma.js";

export async function all() {
  return await prisma.dS_TK.findMany();
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

export async function createUserAccount(user) {
  return await prisma.tK_TT.create({data:user});
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

export async function authUser(req, res, next) {
  if (req.user == null) {
    res.status(403)
    return res.send("You do not have permission!")
  } 

  next()
}

export default {
  all,
  findTransByMaNgGui,
  createUser,
  topupAccount,
  createUserAccount,
  authUser
};
