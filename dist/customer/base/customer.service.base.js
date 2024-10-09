"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServiceBase = void 0;
class CustomerServiceBase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async count(args) {
        return this.prisma.customer.count(args);
    }
    async findMany(args) {
        return this.prisma.customer.findMany(args);
    }
    async findOne(args) {
        return this.prisma.customer.findUnique(args);
    }
    async create(args) {
        return this.prisma.customer.create(args);
    }
    async update(args) {
        return this.prisma.customer.update(args);
    }
    async delete(args) {
        return this.prisma.customer.delete(args);
    }
    async findOrders(parentId, args) {
        return this.prisma.customer
            .findUnique({
            where: { id: parentId },
        })
            .orders(args);
    }
    async getAddress(parentId) {
        return this.prisma.customer
            .findUnique({
            where: { id: parentId },
        })
            .address();
    }
}
exports.CustomerServiceBase = CustomerServiceBase;
//# sourceMappingURL=customer.service.base.js.map