"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServiceBase = void 0;
class OrderServiceBase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async count(args) {
        return this.prisma.order.count(args);
    }
    async findMany(args) {
        return this.prisma.order.findMany(args);
    }
    async findOne(args) {
        return this.prisma.order.findUnique(args);
    }
    async create(args) {
        return this.prisma.order.create(args);
    }
    async update(args) {
        return this.prisma.order.update(args);
    }
    async delete(args) {
        return this.prisma.order.delete(args);
    }
    async getCustomer(parentId) {
        return this.prisma.order
            .findUnique({
            where: { id: parentId },
        })
            .customer();
    }
    async getProduct(parentId) {
        return this.prisma.order
            .findUnique({
            where: { id: parentId },
        })
            .product();
    }
}
exports.OrderServiceBase = OrderServiceBase;
//# sourceMappingURL=order.service.base.js.map