import { prisma } from "../prisma/prisma.js";
export async function all() {
    return await prisma.dS_CK.findMany();
}
export async function findByMaNgGui(date, id) {
    return await prisma.dS_CK.findUnique({
        where: {
            Ngay_Gio: date,
            Ma_Ng_Gui: id
        },
    });
}
// export async function findByName(name) {
//   return await prisma.dS_TK.findMany({
//     where: {
//       Ten_DK: name,
//     },
//   });
// }
export default {
    all,
    findByMaNgGui
    //   findByName,
};
//# sourceMappingURL=employee.model.js.map