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
exports.AddressControllerBase = void 0;
const common = __importStar(require("@nestjs/common"));
const swagger = __importStar(require("@nestjs/swagger"));
const nestMorgan = __importStar(require("nest-morgan"));
const nestAccessControl = __importStar(require("nest-access-control"));
const defaultAuthGuard = __importStar(require("../../auth/defaultAuth.guard"));
const abacUtil = __importStar(require("../../auth/abac.util"));
const prisma_util_1 = require("../../prisma.util");
const errors = __importStar(require("../../errors"));
const class_transformer_1 = require("class-transformer");
const address_service_1 = require("../address.service");
const AddressCreateInput_1 = require("./AddressCreateInput");
const AddressWhereUniqueInput_1 = require("./AddressWhereUniqueInput");
const AddressFindManyArgs_1 = require("./AddressFindManyArgs");
const AddressUpdateInput_1 = require("./AddressUpdateInput");
const Address_1 = require("./Address");
const CustomerWhereInput_1 = require("../../customer/base/CustomerWhereInput");
let AddressControllerBase = class AddressControllerBase {
    constructor(service, rolesBuilder) {
        this.service = service;
        this.rolesBuilder = rolesBuilder;
    }
    async create(data, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "create",
            possession: "any",
            resource: "Address",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new errors.ForbiddenException(`providing the properties: ${properties} on ${"Address"} creation is forbidden for roles: ${roles}`);
        }
        return await this.service.create({
            data: data,
            select: {
                address_1: true,
                address_2: true,
                city: true,
                createdAt: true,
                id: true,
                state: true,
                updatedAt: true,
                zip: true,
            },
        });
    }
    async findMany(request, userRoles) {
        const args = (0, class_transformer_1.plainToClass)(AddressFindManyArgs_1.AddressFindManyArgs, request.query);
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Address",
        });
        const results = await this.service.findMany({
            ...args,
            select: {
                address_1: true,
                address_2: true,
                city: true,
                createdAt: true,
                id: true,
                state: true,
                updatedAt: true,
                zip: true,
            },
        });
        return results.map((result) => permission.filter(result));
    }
    async findOne(params, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "own",
            resource: "Address",
        });
        const result = await this.service.findOne({
            where: params,
            select: {
                address_1: true,
                address_2: true,
                city: true,
                createdAt: true,
                id: true,
                state: true,
                updatedAt: true,
                zip: true,
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
            resource: "Address",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new errors.ForbiddenException(`providing the properties: ${properties} on ${"Address"} update is forbidden for roles: ${roles}`);
        }
        try {
            return await this.service.update({
                where: params,
                data: data,
                select: {
                    address_1: true,
                    address_2: true,
                    city: true,
                    createdAt: true,
                    id: true,
                    state: true,
                    updatedAt: true,
                    zip: true,
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
                    address_1: true,
                    address_2: true,
                    city: true,
                    createdAt: true,
                    id: true,
                    state: true,
                    updatedAt: true,
                    zip: true,
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
    async findManyCustomers(request, params, userRoles) {
        const query = request.query;
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Customer",
        });
        let results = await this.service.findCustomers(params.id, {
            where: query,
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
        results = results == null ? [] : results;
        return results.map((result) => permission.filter(result));
    }
    async createCustomers(params, body, userRoles) {
        const data = {
            customers: {
                connect: body,
            },
        };
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Address",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new common.ForbiddenException(`Updating the relationship: ${invalidAttributes[0]} of ${"Address"} is forbidden for roles: ${roles}`);
        }
        await this.service.update({
            where: params,
            data,
            select: { id: true },
        });
    }
    async updateCustomers(params, body, userRoles) {
        const data = {
            customers: {
                set: body,
            },
        };
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Address",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new common.ForbiddenException(`Updating the relationship: ${invalidAttributes[0]} of ${"Address"} is forbidden for roles: ${roles}`);
        }
        await this.service.update({
            where: params,
            data,
            select: { id: true },
        });
    }
    async deleteCustomers(params, body, userRoles) {
        const data = {
            customers: {
                disconnect: body,
            },
        };
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Address",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
        if (invalidAttributes.length) {
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new common.ForbiddenException(`Updating the relationship: ${invalidAttributes[0]} of ${"Address"} is forbidden for roles: ${roles}`);
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
        resource: "Address",
        action: "create",
        possession: "any",
    }),
    swagger.ApiCreatedResponse({ type: Address_1.Address }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Body()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddressCreateInput_1.AddressCreateInput, Array]),
    __metadata("design:returntype", Promise)
], AddressControllerBase.prototype, "create", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get(),
    nestAccessControl.UseRoles({
        resource: "Address",
        action: "read",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: [Address_1.Address] }),
    swagger.ApiForbiddenResponse(),
    swagger.ApiQuery({
        type: () => AddressFindManyArgs_1.AddressFindManyArgs,
        style: "deepObject",
        explode: true,
    }),
    __param(0, common.Req()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], AddressControllerBase.prototype, "findMany", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get("/:id"),
    nestAccessControl.UseRoles({
        resource: "Address",
        action: "read",
        possession: "own",
    }),
    swagger.ApiOkResponse({ type: Address_1.Address }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __param(1, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddressWhereUniqueInput_1.AddressWhereUniqueInput, Array]),
    __metadata("design:returntype", Promise)
], AddressControllerBase.prototype, "findOne", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Patch("/:id"),
    nestAccessControl.UseRoles({
        resource: "Address",
        action: "update",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: Address_1.Address }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddressWhereUniqueInput_1.AddressWhereUniqueInput,
        AddressUpdateInput_1.AddressUpdateInput, Array]),
    __metadata("design:returntype", Promise)
], AddressControllerBase.prototype, "update", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Delete("/:id"),
    nestAccessControl.UseRoles({
        resource: "Address",
        action: "delete",
        possession: "any",
    }),
    swagger.ApiOkResponse({ type: Address_1.Address }),
    swagger.ApiNotFoundResponse({ type: errors.NotFoundException }),
    swagger.ApiForbiddenResponse({ type: errors.ForbiddenException }),
    __param(0, common.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddressWhereUniqueInput_1.AddressWhereUniqueInput]),
    __metadata("design:returntype", Promise)
], AddressControllerBase.prototype, "delete", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Get("/:id/customers"),
    nestAccessControl.UseRoles({
        resource: "Address",
        action: "read",
        possession: "any",
    }),
    swagger.ApiQuery({
        type: () => CustomerWhereInput_1.CustomerWhereInput,
        style: "deepObject",
        explode: true,
    }),
    __param(0, common.Req()),
    __param(1, common.Param()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddressWhereUniqueInput_1.AddressWhereUniqueInput, Array]),
    __metadata("design:returntype", Promise)
], AddressControllerBase.prototype, "findManyCustomers", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Post("/:id/customers"),
    nestAccessControl.UseRoles({
        resource: "Address",
        action: "update",
        possession: "any",
    }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddressWhereUniqueInput_1.AddressWhereUniqueInput, Array, Array]),
    __metadata("design:returntype", Promise)
], AddressControllerBase.prototype, "createCustomers", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Patch("/:id/customers"),
    nestAccessControl.UseRoles({
        resource: "Address",
        action: "update",
        possession: "any",
    }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddressWhereUniqueInput_1.AddressWhereUniqueInput, Array, Array]),
    __metadata("design:returntype", Promise)
], AddressControllerBase.prototype, "updateCustomers", null);
__decorate([
    common.UseInterceptors(nestMorgan.MorganInterceptor("combined")),
    common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard),
    common.Delete("/:id/customers"),
    nestAccessControl.UseRoles({
        resource: "Address",
        action: "update",
        possession: "any",
    }),
    __param(0, common.Param()),
    __param(1, common.Body()),
    __param(2, nestAccessControl.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddressWhereUniqueInput_1.AddressWhereUniqueInput, Array, Array]),
    __metadata("design:returntype", Promise)
], AddressControllerBase.prototype, "deleteCustomers", null);
AddressControllerBase = __decorate([
    swagger.ApiBearerAuth(),
    __metadata("design:paramtypes", [address_service_1.AddressService, nestAccessControl.RolesBuilder])
], AddressControllerBase);
exports.AddressControllerBase = AddressControllerBase;
//# sourceMappingURL=address.controller.base.js.map