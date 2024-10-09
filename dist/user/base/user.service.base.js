"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceBase = void 0;
const prisma_util_1 = require("../../prisma.util");
class UserServiceBase {
    constructor(prisma, passwordService) {
        this.prisma = prisma;
        this.passwordService = passwordService;
    }
    async count(args) {
        return this.prisma.user.count(args);
    }
    async findMany(args) {
        return this.prisma.user.findMany(args);
    }
    async findOne(args) {
        return this.prisma.user.findUnique(args);
    }
    async create(args) {
        return this.prisma.user.create({
            ...args,
            data: {
                ...args.data,
                password: await this.passwordService.hash(args.data.password),
            },
        });
    }
    async update(args) {
        return this.prisma.user.update({
            ...args,
            data: {
                ...args.data,
                password: args.data.password &&
                    (await (0, prisma_util_1.transformStringFieldUpdateInput)(args.data.password, (password) => this.passwordService.hash(password))),
            },
        });
    }
    async delete(args) {
        return this.prisma.user.delete(args);
    }
}
exports.UserServiceBase = UserServiceBase;
//# sourceMappingURL=user.service.base.js.map