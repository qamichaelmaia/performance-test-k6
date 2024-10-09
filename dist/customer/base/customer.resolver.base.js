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
exports.CustomerResolverBase = void 0;
const common = __importStar(require("@nestjs/common"));
const graphql = __importStar(require("@nestjs/graphql"));
const nestAccessControl = __importStar(require("nest-access-control"));
const gqlDefaultAuth_guard_1 = require("../../auth/gqlDefaultAuth.guard");
const gqlACGuard = __importStar(require("../../auth/gqlAC.guard"));
const gqlUserRoles = __importStar(require("../../auth/gqlUserRoles.decorator"));
const abacUtil = __importStar(require("../../auth/abac.util"));
const prisma_util_1 = require("../../prisma.util");
const MetaQueryPayload_1 = require("../../util/MetaQueryPayload");
const CreateCustomerArgs_1 = require("./CreateCustomerArgs");
const UpdateCustomerArgs_1 = require("./UpdateCustomerArgs");
const DeleteCustomerArgs_1 = require("./DeleteCustomerArgs");
const CustomerFindManyArgs_1 = require("./CustomerFindManyArgs");
const CustomerFindUniqueArgs_1 = require("./CustomerFindUniqueArgs");
const Customer_1 = require("./Customer");
const OrderFindManyArgs_1 = require("../../order/base/OrderFindManyArgs");
const Order_1 = require("../../order/base/Order");
const Address_1 = require("../../address/base/Address");
const customer_service_1 = require("../customer.service");
const graphql_1 = require("graphql");
let CustomerResolverBase = class CustomerResolverBase {
    constructor(service, rolesBuilder) {
        this.service = service;
        this.rolesBuilder = rolesBuilder;
    }
    async _customersMeta(args) {
        const results = await this.service.count({
            ...args,
            skip: undefined,
            take: undefined,
        });
        return {
            count: results,
        };
    }
    async customers(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Customer",
        });
        const results = await this.service.findMany(args);
        return results.map((result) => permission.filter(result));
    }
    async customer(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "own",
            resource: "Customer",
        });
        const result = await this.service.findOne(args);
        if (result === null) {
            return null;
        }
        return permission.filter(result);
    }
    async createCustomer(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "create",
            possession: "any",
            resource: "Customer",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, args.data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new graphql_1.GraphQLError(`providing the properties: ${properties} on ${"Customer"} creation is forbidden for roles: ${roles}`);
        }
        return await this.service.create({
            ...args,
            data: {
                ...args.data,
                address: args.data.address
                    ? {
                        connect: args.data.address,
                    }
                    : undefined,
            },
        });
    }
    async updateCustomer(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Customer",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, args.data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new graphql_1.GraphQLError(`providing the properties: ${properties} on ${"Customer"} update is forbidden for roles: ${roles}`);
        }
        try {
            return await this.service.update({
                ...args,
                data: {
                    ...args.data,
                    address: args.data.address
                        ? {
                            connect: args.data.address,
                        }
                        : undefined,
                },
            });
        }
        catch (error) {
            if ((0, prisma_util_1.isRecordNotFoundError)(error)) {
                throw new graphql_1.GraphQLError(`No resource was found for ${JSON.stringify(args.where)}`);
            }
            throw error;
        }
    }
    async deleteCustomer(args) {
        try {
            return await this.service.delete(args);
        }
        catch (error) {
            if ((0, prisma_util_1.isRecordNotFoundError)(error)) {
                throw new graphql_1.GraphQLError(`No resource was found for ${JSON.stringify(args.where)}`);
            }
            throw error;
        }
    }
    async orders(parent, args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Order",
        });
        const results = await this.service.findOrders(parent.id, args);
        if (!results) {
            return [];
        }
        return results.map((result) => permission.filter(result));
    }
    async address(parent, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Address",
        });
        const result = await this.service.getAddress(parent.id);
        if (!result) {
            return null;
        }
        return permission.filter(result);
    }
};
__decorate([
    graphql.Query(() => MetaQueryPayload_1.MetaQueryPayload),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerFindManyArgs_1.CustomerFindManyArgs]),
    __metadata("design:returntype", Promise)
], CustomerResolverBase.prototype, "_customersMeta", null);
__decorate([
    graphql.Query(() => [Customer_1.Customer]),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerFindManyArgs_1.CustomerFindManyArgs, Array]),
    __metadata("design:returntype", Promise)
], CustomerResolverBase.prototype, "customers", null);
__decorate([
    graphql.Query(() => Customer_1.Customer, { nullable: true }),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "read",
        possession: "own",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerFindUniqueArgs_1.CustomerFindUniqueArgs, Array]),
    __metadata("design:returntype", Promise)
], CustomerResolverBase.prototype, "customer", null);
__decorate([
    graphql.Mutation(() => Customer_1.Customer),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "create",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCustomerArgs_1.CreateCustomerArgs, Array]),
    __metadata("design:returntype", Promise)
], CustomerResolverBase.prototype, "createCustomer", null);
__decorate([
    graphql.Mutation(() => Customer_1.Customer),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "update",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateCustomerArgs_1.UpdateCustomerArgs, Array]),
    __metadata("design:returntype", Promise)
], CustomerResolverBase.prototype, "updateCustomer", null);
__decorate([
    graphql.Mutation(() => Customer_1.Customer),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "delete",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteCustomerArgs_1.DeleteCustomerArgs]),
    __metadata("design:returntype", Promise)
], CustomerResolverBase.prototype, "deleteCustomer", null);
__decorate([
    graphql.ResolveField(() => [Order_1.Order]),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Parent()),
    __param(1, graphql.Args()),
    __param(2, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Customer_1.Customer,
        OrderFindManyArgs_1.OrderFindManyArgs, Array]),
    __metadata("design:returntype", Promise)
], CustomerResolverBase.prototype, "orders", null);
__decorate([
    graphql.ResolveField(() => Address_1.Address, { nullable: true }),
    nestAccessControl.UseRoles({
        resource: "Customer",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Parent()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Customer_1.Customer, Array]),
    __metadata("design:returntype", Promise)
], CustomerResolverBase.prototype, "address", null);
CustomerResolverBase = __decorate([
    graphql.Resolver(() => Customer_1.Customer),
    common.UseGuards(gqlDefaultAuth_guard_1.GqlDefaultAuthGuard, gqlACGuard.GqlACGuard),
    __metadata("design:paramtypes", [customer_service_1.CustomerService, nestAccessControl.RolesBuilder])
], CustomerResolverBase);
exports.CustomerResolverBase = CustomerResolverBase;
//# sourceMappingURL=customer.resolver.base.js.map