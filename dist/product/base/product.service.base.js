"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServiceBase = void 0;
class ProductServiceBase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async count(args) {
        return this.prisma.product.count(args);
    }
    async findMany(args) {
        return this.prisma.product.findMany(args);
    }
    async findOne(args) {
        return this.prisma.product.findUnique(args);
    }
    async create(args) {
        return this.prisma.product.create(args);
    }
    async update(args) {
        return this.prisma.product.update(args);
    }
    async delete(args) {
        return this.prisma.product.delete(args);
    }
    async findOrders(parentId, args) {
        return this.prisma.product
            .findUnique({
            where: { id: parentId },
        })
            .orders(args);
    }
}
exports.ProductServiceBase = ProductServiceBase;
//# sourceMappingURL=product.service.base.js.map