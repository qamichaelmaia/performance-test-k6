"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllerBase = void 0;
const common = __importStar(require("@nestjs/common"));
const swagger = __importStar(require("@nestjs/swagger"));
const nestMorgan = __importStar(require("nest-morgan"));
const nestAccessControl = __importStar(require("nest-access-control"));
const defaultAuthGuard = __importStar(require("../../auth/defaultAuth.guard"));
const abacUtil = __importStar(require("../../auth/abac.util"));
const prisma_util_1 = require("../../prisma.util");
const errors = __importStar(require("../../errors"));
const class_transformer_1 = require("class-transformer");
const order_service_1 = require("../order.service");
const OrderCreateInput_1 = require("./OrderCreateInput");
const OrderWhereUniqueInput_1 = require("./OrderWhereUniqueInput");
const OrderFindManyArgs_1 = require("./OrderFindManyArgs");
const OrderUpdateInput_1 = require("./OrderUpdateInput");
const Order_1 = require("./Order");
let OrderControllerBase = class OrderControllerBase {
    constructor(service, rolesBuilder) {
        this.service = service;
        this.rolesBuilder = rolesBuilder;
    }
    async create(data, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "create",
            possession: "any",
            resource: "Order",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new errors.ForbiddenException(`providing the properties: ${properties} on ${"Order"} creation is forbidden for roles: ${roles}`);
        }
        return await this.service.create({
            data: {
                ...data,
                customer: data.customer
                    ? {
                        connect: data.customer,
                    }
                    : undefined,
                product: data.product
                    ? {
                        connect: data.product,
                    }
                    : undefined,
            },
            select: {
                createdAt: true,
                customer: {
                    select: {
                        id: true,
                    },
                },
                discount: true,
                id: true,
                product: {
                    select: {
                        id: true,
                    },
                },
                quantity: true,
                totalPrice: true,
                updatedAt: true,
            },
        });
    }
    async findMany(request, userRoles) {
        const args = (0, class_transformer_1.plainToClass)(OrderFindManyArgs_1.OrderFindManyArgs, request.query);
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Order",
        });
        const results = await this.service.findMany({
            ...args,
            select: {
                createdAt: true,
                customer: {
                    select: {
                        id: true,
                    },
                },
                discount: true,
                id: true,
                product: {
                    select: {
                        id: true,
                    },
                },
                quantity: true,
                totalPrice: true,
                updatedAt: true,
            },
        });
        return results.map((result) => permission.filter(result));
    }
    async findOne(params, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "own",
            resource: "Order",
        });
        const result = await this.service.findOne({
            where: params,
            select: {
                createdAt: true,
                customer: {
                    select: {
                        id: true,
                    },
                },
                discount: true,
                id: true,
                product: {
                    select: {
                        id: true,
                    },
                },
                quantity: true,
                totalPrice: true,
                updatedAt: true,
            },
        });
        if (result === null) {
            throw new errors.NotFoundException(`No resource was found for ${JSON.stringify(params)}`);
        }
        return permission.filter(result);
    }
    async update(params, data, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Order",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new errors.ForbiddenException(`providing the properties: ${properties} on ${"Order"} update is forbidden for roles: ${roles}`);
        }
        try {
            return await this.service.update({
                where: params,
                data: {
                    ...data,
                    customer: data.customer
                        ? {
                            connect: data.customer,
                        }
                        : undefined,
                    product: data.product
                        ? {
                            connect: data.product,
                        }
                        : undefined,
                },
                select: {
                    createdAt: true,
                    customer: {
                        select: {
                            id: true,
                        },
                    },
                    discount: true,
                    id: true,
                    product: {
                        select: {
                            id: true,
                        },
                    },
                    quantity: true,
                    totalPrice: true,
                    updatedAt: true,
                },
            });
        }
        catch (error) {
            if ((0, prisma_util_1.isRecordNotFoundError)(error)) {
                throw new errors.NotFoundException(`No resource was found for ${JSON.stringify(params)}`);
            }
            throw error;
        }
    }
    async delete(params) {
        try {
            return await this.service.delete({
                where: params,
                select: {
                    createdAt: true,
                    customer: {
                        select: {
                            id: true,
                        },
                    },
                    discount: true,
                    id: true,
                    product: {
                        select: {
                            id: true,
                        },
                    },
                    quantity: true,
                    totalPrice: true,
                    updatedAt: true,
                },
            });
        }
        catch (error) {
            if ((0, prisma_util_1.isRecordNotFoundError)(error)) {
                throw new errors.NotFoundException(`No resource was found for ${JSON.stringify(params)}`);
            }
            throw error;
        }
    }
};
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Post(),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "create",
        possession: "any",
    }),
    swagger.ApiCreatedResponse({ type: Order_1.Order }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Body()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderCreateInput_1.OrderCreateInput, Array]),
    __metadata("design:returntype", Promise)
], OrderControllerBase.prototype, "create", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get(),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "read",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: [Order_1.Order] }),
    swagger.ApiForbiddenResponse(),
    swagger.ApiQuery({
        type: () => OrderFindManyArgs_1.OrderFindManyArgs,
        style: "deepObject",
        explode: true,
    }),
    __param(0, common.Req()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], OrderControllerBase.prototype, "findMany", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get("/:id"),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "read",
        possession: "own",
    }),
    swagger.ApiOkResponse({ type: Order_1.Order }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderWhereUniqueInput_1.OrderWhereUniqueInput, Array]),
    __metadata("design:returntype", Promise)
], OrderControllerBase.prototype, "findOne", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Patch("/:id"),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "update",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: Order_1.Order }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderWhereUniqueInput_1.OrderWhereUniqueInput,
        OrderUpdateInput_1.OrderUpdateInput, Array]),
    __metadata("design:returntype", Promise)
], OrderControllerBase.prototype, "update", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Delete("/:id"),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "delete",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: Order_1.Order }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderWhereUniqueInput_1.OrderWhereUniqueInput]),
    __metadata("design:returntype", Promise)
], OrderControllerBase.prototype, "delete", null);
OrderControllerBase = __decorate([
    swagger.ApiBearerAuth(),
    __metadata("design:paramtypes", [order_service_1.OrderService, nestAccessControl.RolesBuilder])
], OrderControllerBase);
exports.OrderControllerBase = OrderControllerBase;
//# sourceMappingURL=order.controller.base.js.map