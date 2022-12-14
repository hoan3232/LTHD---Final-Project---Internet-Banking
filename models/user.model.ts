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

export async function accountInfoPhone(phone) {
  return await prisma.dS_TK.findUnique({
    where: {
      Phone: phone,
    },
    include: {
      TK_TT: {
        select: {
          STK: true,
          Ngan_Hang: true,
        },
      },
    },
  });
}

export async function accountInfoSTK(stk) {
  return await prisma.tK_TT.findUnique({
    where: {
      STK: stk,
    },
  });
}

export async function transHistory(id) {
  var lastDay = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
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

export async function createContact(contact) {
  var name = await prisma.tK_TT.findUnique({
    where: {
      STK: contact.Id2,
    },
    include: {
      DS_TK: {
        select: {
          Ten_DK: true,
        },
      },
    },
  });

  return await prisma.dS_GN.create({
    data: {
      Id1: contact.Id1,
      Id2: contact.Id2,
      TenGN: name.DS_TK.Ten_DK,
    },
  });
}

export async function accountStatus(id) {
  var status = await prisma.tK_TT.findUnique({
    where: {
      Id: id,
    },
  });

  if (status.Trang_Thai) {
    return await prisma.tK_TT.update({
      where: {
        Id: id,
      },
      data: {
        Trang_Thai: false,
      },
    });
  } else {
    return await prisma.tK_TT.update({
      where: {
        Id: id,
      },
      data: {
        Trang_Thai: true,
      },
    });
  }
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

export async function depositViaSTK(stk: string, amount: number) {
  return await prisma.tK_TT.update({
    where: {
      STK: stk,
    },
    data: {
      So_Du: {
        increment: amount,
      },
    },
  });
}

export async function depositViaPhone(phone: string, amount: number) {
  const STK = (await accountInfoPhone(phone)).TK_TT.STK;
  return await depositViaSTK(STK, amount);
}

export default {
  all,
  accountInfo,
  transHistory,
  createContact,
  accountStatus,
  findById,
  addUser,
  isValidRefreshToken,
  updateRefreshToken,
  accountInfoPhone,
  accountInfoSTK,
  depositViaPhone,
  depositViaSTK,
};
