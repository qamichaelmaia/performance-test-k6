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
exports.CustomerControllerBase = void 0;
const common = __importStar(require("@nestjs/common"));
const swagger = __importStar(require("@nestjs/swagger"));
const nestMorgan = __importStar(require("nest-morgan"));
const nestAccessControl = __importStar(require("nest-access-control"));
const defaultAuthGuard = __importStar(require("../../auth/defaultAuth.guard"));
const abacUtil = __importStar(require("../../auth/abac.util"));
const prisma_util_1 = require("../../prisma.util");
const errors = __importStar(require("../../errors"));
const class_transformer_1 = require("class-transformer");
const customer_service_1 = require("../customer.service");
const CustomerCreateInput_1 = require("./CustomerCreateInput");
const CustomerWhereUniqueInput_1 = require("./CustomerWhereUniqueInput");
const CustomerFindManyArgs_1 = require("./CustomerFindManyArgs");
const CustomerUpdateInput_1 = require("./CustomerUpdateInput");
const Customer_1 = require("./Customer");
const OrderWhereInput_1 = require("../../order/base/OrderWhereInput");
let CustomerControllerBase = class CustomerControllerBase {
    constructor(service, rolesBuilder) {
        this.service = service;
        this.rolesBuilder = rolesBuilder;
    }
    async create(data, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "create",
            possession: "any",
            resource: "Customer",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new errors.ForbiddenException(`providing the properties: ${properties} on ${"Customer"} creation is forbidden for roles: ${roles}`);
        }
        return await this.service.create({
            data: {
                ...data,
                address: data.address
                    ? {
                        connect: data.address,
                    }
                    : undefined,
            },
            select: {
                address: {
                    select: {
                        id: true,
                    },
                },
                createdAt: true,
                email: true,
                firstName: true,
                id: true,
                lastName: true,
                phone: true,
                updatedAt: true,
            },
        });
    }
    async findMany(request, userRoles) {
        const args = (0, class_transformer_1.plainToClass)(CustomerFindManyArgs_1.CustomerFindManyArgs, request.query);
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Customer",
        });
        const results = await this.service.findMany({
            ...args,
            select: {
                address: {
                    select: {
                        id: true,
                    },
                },
                createdAt: true,
                email: true,
                firstName: true,
                id: true,
                lastName: true,
                phone: true,
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
            resource: "Customer",
        });
        const result = await this.service.findOne({
            where: params,
            select: {
                address: {
                    select: {
                        id: true,
                    },
                },
                createdAt: true,
                email: true,
                firstName: true,
                id: true,
                lastName: true,
                phone: true,
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
            resource: "Customer",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new errors.ForbiddenException(`providing the properties: ${properties} on ${"Customer"} update is forbidden for roles: ${roles}`);
        }
        try {
            return await this.service.update({
                where: params,
                data: {
                    ...data,
                    address: data.address
                        ? {
                            connect: data.address,
                        }
                        : undefined,
                },
                select: {
                    address: {
                        select: {
                            id: true,
                        },
                    },
                    createdAt: true,
                    email: true,
                    firstName: true,
                    id: true,
                    lastName: true,
                    phone: true,
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
                    address: {
                        select: {
                            id: true,
                        },
                    },
                    createdAt: true,
                    email: true,
                    firstName: true,
                    id: true,
                    lastName: true,
                    phone: true,
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
            resource: "Customer",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new common.ForbiddenException(`Updating the relationship: ${invalidAttributes[0]} of ${"Customer"} is forbidden for roles: ${roles}`);
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
            resource: "Customer",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new common.ForbiddenException(`Updating the relationship: ${invalidAttributes[0]} of ${"Customer"} is forbidden for roles: ${roles}`);
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
            resource: "Customer",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new common.ForbiddenException(`Updating the relationship: ${invalidAttributes[0]} of ${"Customer"} is forbidden for roles: ${roles}`);
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
        resource: "Customer",
        action: "create",
        possession: "any",
    }),
    swagger.ApiCreatedResponse({ type: Customer_1.Customer }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Body()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerCreateInput_1.CustomerCreateInput, Array]),
    __metadata("design:returntype", Promise)
], CustomerControllerBase.prototype, "create", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get(),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "read",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: [Customer_1.Customer] }),
    swagger.ApiForbiddenResponse(),
    swagger.ApiQuery({
        type: () => CustomerFindManyArgs_1.CustomerFindManyArgs,
        style: "deepObject",
        explode: true,
    }),
    __param(0, common.Req()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], CustomerControllerBase.prototype, "findMany", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get("/:id"),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "read",
        possession: "own",
    }),
    swagger.ApiOkResponse({ type: Customer_1.Customer }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerWhereUniqueInput_1.CustomerWhereUniqueInput, Array]),
    __metadata("design:returntype", Promise)
], CustomerControllerBase.prototype, "findOne", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Patch("/:id"),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "update",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: Customer_1.Customer }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerWhereUniqueInput_1.CustomerWhereUniqueInput,
        CustomerUpdateInput_1.CustomerUpdateInput, Array]),
    __metadata("design:returntype", Promise)
], CustomerControllerBase.prototype, "update", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Delete("/:id"),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "delete",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: Customer_1.Customer }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerWhereUniqueInput_1.CustomerWhereUniqueInput]),
    __metadata("design:returntype", Promise)
], CustomerControllerBase.prototype, "delete", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get("/:id/orders"),
    nestAccessControl.UseRoles({
        resource: "Customer",
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
    __metadata("design:paramtypes", [Object, CustomerWhereUniqueInput_1.CustomerWhereUniqueInput, Array]),
    __metadata("design:returntype", Promise)
], CustomerControllerBase.prototype, "findManyOrders", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Post("/:id/orders"),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "update",
        possession: "any",
    }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerWhereUniqueInput_1.CustomerWhereUniqueInput, Array, Array]),
    __metadata("design:returntype", Promise)
], CustomerControllerBase.prototype, "createOrders", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Patch("/:id/orders"),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "update",
        possession: "any",
    }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerWhereUniqueInput_1.CustomerWhereUniqueInput, Array, Array]),
    __metadata("design:returntype", Promise)
], CustomerControllerBase.prototype, "updateOrders", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Delete("/:id/orders"),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "update",
        possession: "any",
    }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerWhereUniqueInput_1.CustomerWhereUniqueInput, Array, Array]),
    __metadata("design:returntype", Promise)
], CustomerControllerBase.prototype, "deleteOrders", null);
CustomerControllerBase = __decorate([
    swagger.ApiBearerAuth(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService, nestAccessControl.RolesBuilder])
], CustomerControllerBase);
exports.CustomerControllerBase = CustomerControllerBase;
//# sourceMappingURL=customer.controller.base.js.map