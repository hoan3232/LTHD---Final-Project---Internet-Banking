import { prisma } from "../prisma/prisma.js";

export async function all() {
  return await prisma.dS_CK.findMany();
}

export async function accountInfo(id) {
  return await prisma.tK_TT.findUnique({
    where: {
      Id: id,
    },
  });
}

export async function transHistory(id) {
  let lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return await prisma.dS_CK.findMany({
    where: {
      AND: [
        {
          Ma_Ng_Gui: id,
        },
        {
          Ngay_Gio: {
            gte: lastDay,
          },
        },
      ],
    },
  });
}

export async function findById(id) {
  return await prisma.dS_TK.findUnique({
    where: {
      Id: id,
    },
    include: {
      TK_TT: {
        select: {
          So_Du: true,
          STK: true,
        },
      },
    },
  });
}

export async function addUser(user) {
  const res = await prisma.dS_TK.create({ data: user });
  return res[0];
}

export async function updateRefreshToken(id, refreshToken) {
  return await prisma.dS_TK.update({
    where: {
      Id: id,
    },
    data: { rfToken: refreshToken },
  });
}
export async function isValidRefreshToken(id, refreshToken) {
  const list = await prisma.dS_TK.findMany({
    where: {
      Id: id,
      rfToken: refreshToken,
    },
  });
  if (list.length > 0) {
    return true;
  }
  return false;
}

export default {
  all,
  accountInfo,
  transHistory,
  findById,
  addUser,
  isValidRefreshToken,
  updateRefreshToken,
};
