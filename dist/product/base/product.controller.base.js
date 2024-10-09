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
exports.ProductControllerBase = void 0;
const common = __importStar(require("@nestjs/common"));
const swagger = __importStar(require("@nestjs/swagger"));
const nestMorgan = __importStar(require("nest-morgan"));
const nestAccessControl = __importStar(require("nest-access-control"));
const defaultAuthGuard = __importStar(require("../../auth/defaultAuth.guard"));
const abacUtil = __importStar(require("../../auth/abac.util"));
const prisma_util_1 = require("../../prisma.util");
const errors = __importStar(require("../../errors"));
const class_transformer_1 = require("class-transformer");
const product_service_1 = require("../product.service");
const ProductCreateInput_1 = require("./ProductCreateInput");
const ProductWhereUniqueInput_1 = require("./ProductWhereUniqueInput");
const ProductFindManyArgs_1 = require("./ProductFindManyArgs");
const ProductUpdateInput_1 = require("./ProductUpdateInput");
const Product_1 = require("./Product");
const OrderWhereInput_1 = require("../../order/base/OrderWhereInput");
let ProductControllerBase = class ProductControllerBase {
    constructor(service, rolesBuilder) {
        this.service = service;
        this.rolesBuilder = rolesBuilder;
    }
    async create(data, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "create",
            possession: "any",
            resource: "Product",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new errors.ForbiddenException(`providing the properties: ${properties} on ${"Product"} creation is forbidden for roles: ${roles}`);
        }
        return await this.service.create({
            data: data,
            select: {
                createdAt: true,
                description: true,
                id: true,
                itemPrice: true,
                name: true,
                updatedAt: true,
            },
        });
    }
    async findMany(request, userRoles) {
        const args = (0, class_transformer_1.plainToClass)(ProductFindManyArgs_1.ProductFindManyArgs, request.query);
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Product",
        });
        const results = await this.service.findMany({
            ...args,
            select: {
                createdAt: true,
                description: true,
                id: true,
                itemPrice: true,
                name: true,
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
            resource: "Product",
        });
        const result = await this.service.findOne({
            where: params,
            select: {
                createdAt: true,
                description: true,
                id: true,
                itemPrice: true,
                name: true,
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
            resource: "Product",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new errors.ForbiddenException(`providing the properties: ${properties} on ${"Product"} update is forbidden for roles: ${roles}`);
        }
        try {
            return await this.service.update({
                where: params,
                data: data,
                select: {
                    createdAt: true,
                    description: true,
                    id: true,
                    itemPrice: true,
                    name: true,
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
                    description: true,
                    id: true,
                    itemPrice: true,
                    name: true,
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
    async findManyOrders(request, params, userRoles) {
        const query = request.query;
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Order",
        });
        let results = await this.service.findOrders(params.id, {
            where: query,
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
        results = results == null ? [] : results;
        return results.map((result) => permission.filter(result));
    }
    async createOrders(params, body, userRoles) {
        const data = {
            orders: {
                connect: body,
            },
        };
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Product",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new common.ForbiddenException(`Updating the relationship: ${invalidAttributes[0]} of ${"Product"} is forbidden for roles: ${roles}`);
        }
        await this.service.update({
            where: params,
            data,
            select: { id: true },
        });
    }
    async updateOrders(params, body, userRoles) {
        const data = {
            orders: {
                set: body,
            },
        };
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Product",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new common.ForbiddenException(`Updating the relationship: ${invalidAttributes[0]} of ${"Product"} is forbidden for roles: ${roles}`);
        }
        await this.service.update({
            where: params,
            data,
            select: { id: true },
        });
    }
    async deleteOrders(params, body, userRoles) {
        const data = {
            orders: {
                disconnect: body,
            },
        };
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Product",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new common.ForbiddenException(`Updating the relationship: ${invalidAttributes[0]} of ${"Product"} is forbidden for roles: ${roles}`);
        }
        await this.service.update({
            where: params,
            data,
            select: { id: true },
        });
    }
};
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Post(),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "create",
        possession: "any",
    }),
    swagger.ApiCreatedResponse({ type: Product_1.Product }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Body()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductCreateInput_1.ProductCreateInput, Array]),
    __metadata("design:returntype", Promise)
], ProductControllerBase.prototype, "create", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get(),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "read",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: [Product_1.Product] }),
    swagger.ApiForbiddenResponse(),
    swagger.ApiQuery({
        type: () => ProductFindManyArgs_1.ProductFindManyArgs,
        style: "deepObject",
        explode: true,
    }),
    __param(0, common.Req()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ProductControllerBase.prototype, "findMany", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get("/:id"),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "read",
        possession: "own",
    }),
    swagger.ApiOkResponse({ type: Product_1.Product }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductWhereUniqueInput_1.ProductWhereUniqueInput, Array]),
    __metadata("design:returntype", Promise)
], ProductControllerBase.prototype, "findOne", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Patch("/:id"),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "update",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: Product_1.Product }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductWhereUniqueInput_1.ProductWhereUniqueInput,
        ProductUpdateInput_1.ProductUpdateInput, Array]),
    __metadata("design:returntype", Promise)
], ProductControllerBase.prototype, "update", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Delete("/:id"),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "delete",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: Product_1.Product }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductWhereUniqueInput_1.ProductWhereUniqueInput]),
    __metadata("design:returntype", Promise)
], ProductControllerBase.prototype, "delete", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get("/:id/orders"),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "read",
        possession: "any",
    }),
    swagger.ApiQuery({
        type: () => OrderWhereInput_1.OrderWhereInput,
        style: "deepObject",
        explode: true,
    }),
    __param(0, common.Req()),
    __param(1, common.Param()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ProductWhereUniqueInput_1.ProductWhereUniqueInput, Array]),
    __metadata("design:returntype", Promise)
], ProductControllerBase.prototype, "findManyOrders", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Post("/:id/orders"),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "update",
        possession: "any",
    }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductWhereUniqueInput_1.ProductWhereUniqueInput, Array, Array]),
    __metadata("design:returntype", Promise)
], ProductControllerBase.prototype, "createOrders", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Patch("/:id/orders"),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "update",
        possession: "any",
    }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductWhereUniqueInput_1.ProductWhereUniqueInput, Array, Array]),
    __metadata("design:returntype", Promise)
], ProductControllerBase.prototype, "updateOrders", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Delete("/:id/orders"),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "update",
        possession: "any",
    }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductWhereUniqueInput_1.ProductWhereUniqueInput, Array, Array]),
    __metadata("design:returntype", Promise)
], ProductControllerBase.prototype, "deleteOrders", null);
ProductControllerBase = __decorate([
    swagger.ApiBearerAuth(),
    __metadata("design:paramtypes", [product_service_1.ProductService, nestAccessControl.RolesBuilder])
], ProductControllerBase);
exports.ProductControllerBase = ProductControllerBase;
//# sourceMappingURL=product.controller.base.js.map