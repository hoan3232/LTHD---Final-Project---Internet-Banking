import { prisma } from "../prisma/prisma.js";

export async function all() {
  return await prisma.dS_CK.findMany();
}

export async function findTransByMaNgGui(name) {
  return await prisma.dS_CK.findMany({
    where: {
      Ma_Ng_Gui: name,
    },
  });
}

export async function createUser(user) {
  return await prisma.dS_TK.create({
    data: {
      Id: user.Id,
      Pass: user.Pass,
      Ten_DK: user.Ten_DK,
      Ten_Goi_Nho: user.Ten_Goi_Nho,
      Email: user.Email,
      Phone: user.Phone
    },
  });
}

export async function createUserAccount(user) {
  return await prisma.tK_TT.create({ data: user });
}

export async function topupAccount(data) {
  return await prisma.tK_TT.update({
    where: {
      STK: data.Id,
    },
    data: {
      So_Du: {
        increment: parseFloat(data.Money),
      },
    },
  });
}

export async function authUser(req, res, next) {
  if (req.user == null) {
    res.status(403);
    return res.send("Endpoint not found!");
  }

  next();
}

export default {
  all,
  findTransByMaNgGui,
  createUser,
  topupAccount,
  createUserAccount,
  authUser,
};
