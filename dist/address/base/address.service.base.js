"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressServiceBase = void 0;
class AddressServiceBase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async count(args) {
        return this.prisma.address.count(args);
    }
    async findMany(args) {
        return this.prisma.address.findMany(args);
    }
    async findOne(args) {
        return this.prisma.address.findUnique(args);
    }
    async create(args) {
        return this.prisma.address.create(args);
    }
    async update(args) {
        return this.prisma.address.update(args);
    }
    async delete(args) {
        return this.prisma.address.delete(args);
    }
    async findCustomers(parentId, args) {
        return this.prisma.address
            .findUnique({
            where: { id: parentId },
        })
            .customers(args);
    }
}
exports.AddressServiceBase = AddressServiceBase;
//# sourceMappingURL=address.service.base.js.map