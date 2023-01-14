import { prisma } from "../prisma/prisma.js";

export async function showEmplist() {
    return await prisma.dS_TK.findMany({
        where: {
            Id: {
                contains: 'emp',
            },
        },
    });
}

export async function createEmp(user) {
    return await prisma.dS_TK.create({ data: user});
    
}

export async function deleteEmp(user) {
    return await prisma.dS_TK.delete({
        where: {
            Id: user.Id,
        },
    });
    
}

export async function updateEmp(user) {
    return await prisma.dS_TK.update({
        where: {
            Id: user.Id,
        },
        data: user,
    });
}

export async function showTrans() {
    return await prisma.dS_CK.findMany({
        include: {
            TK_TT_DS_CK_Ma_Ng_NhanToTK_TT: {
                select: {
                    Ngan_Hang: true,
                },
            },
        },
    });
}

export async function showBankTrans(bank) {
    return await prisma.dS_CK.findMany({
        where: {
            TK_TT_DS_CK_Ma_Ng_NhanToTK_TT: {
                    Ngan_Hang: bank.name,
                },
        },
        include: {
            TK_TT_DS_CK_Ma_Ng_NhanToTK_TT: {
                select: {
                    Ngan_Hang: true,
                },
            },
        },
    });
}

export async function showTransTime(bank) {
    return await prisma.dS_CK.findMany({
        where: {
            AND: [
                {
                    Ngay_Gio: {
                        gte: bank.time1,
                    },
                },
                {
                    Ngay_Gio: {
                        lte: bank.time2,
                    },
                },
            ],
        },
        include: {
            TK_TT_DS_CK_Ma_Ng_NhanToTK_TT: {
                select: {
                    Ngan_Hang: true,
                },
            },
        },
    });
}

export default {
    showEmplist,
    createEmp,
    deleteEmp,
    updateEmp,
    showTrans,
    showBankTrans,
    showTransTime
}