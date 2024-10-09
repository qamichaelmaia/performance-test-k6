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
exports.OrderResolverBase = void 0;
const common = __importStar(require("@nestjs/common"));
const graphql = __importStar(require("@nestjs/graphql"));
const nestAccessControl = __importStar(require("nest-access-control"));
const gqlDefaultAuth_guard_1 = require("../../auth/gqlDefaultAuth.guard");
const gqlACGuard = __importStar(require("../../auth/gqlAC.guard"));
const gqlUserRoles = __importStar(require("../../auth/gqlUserRoles.decorator"));
const abacUtil = __importStar(require("../../auth/abac.util"));
const prisma_util_1 = require("../../prisma.util");
const MetaQueryPayload_1 = require("../../util/MetaQueryPayload");
const CreateOrderArgs_1 = require("./CreateOrderArgs");
const UpdateOrderArgs_1 = require("./UpdateOrderArgs");
const DeleteOrderArgs_1 = require("./DeleteOrderArgs");
const OrderFindManyArgs_1 = require("./OrderFindManyArgs");
const OrderFindUniqueArgs_1 = require("./OrderFindUniqueArgs");
const Order_1 = require("./Order");
const Customer_1 = require("../../customer/base/Customer");
const Product_1 = require("../../product/base/Product");
const order_service_1 = require("../order.service");
const graphql_1 = require("graphql");
let OrderResolverBase = class OrderResolverBase {
    constructor(service, rolesBuilder) {
        this.service = service;
        this.rolesBuilder = rolesBuilder;
    }
    async _ordersMeta(args) {
        const results = await this.service.count({
            ...args,
            skip: undefined,
            take: undefined,
        });
        return {
            count: results,
        };
    }
    async orders(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Order",
        });
        const results = await this.service.findMany(args);
        return results.map((result) => permission.filter(result));
    }
    async order(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "own",
            resource: "Order",
        });
        const result = await this.service.findOne(args);
        if (result === null) {
            return null;
        }
        return permission.filter(result);
    }
    async createOrder(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "create",
            possession: "any",
            resource: "Order",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, args.data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new graphql_1.GraphQLError(`providing the properties: ${properties} on ${"Order"} creation is forbidden for roles: ${roles}`);
        }
        return await this.service.create({
            ...args,
            data: {
                ...args.data,
                customer: args.data.customer
                    ? {
                        connect: args.data.customer,
                    }
                    : undefined,
                product: args.data.product
                    ? {
                        connect: args.data.product,
                    }
                    : undefined,
            },
        });
    }
    async updateOrder(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Order",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, args.data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new graphql_1.GraphQLError(`providing the properties: ${properties} on ${"Order"} update is forbidden for roles: ${roles}`);
        }
        try {
            return await this.service.update({
                ...args,
                data: {
                    ...args.data,
                    customer: args.data.customer
                        ? {
                            connect: args.data.customer,
                        }
                        : undefined,
                    product: args.data.product
                        ? {
                            connect: args.data.product,
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
    async deleteOrder(args) {
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
    async customer(parent, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Customer",
        });
        const result = await this.service.getCustomer(parent.id);
        if (!result) {
            return null;
        }
        return permission.filter(result);
    }
    async product(parent, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Product",
        });
        const result = await this.service.getProduct(parent.id);
        if (!result) {
            return null;
        }
        return permission.filter(result);
    }
};
__decorate([
    graphql.Query(() => MetaQueryPayload_1.MetaQueryPayload),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderFindManyArgs_1.OrderFindManyArgs]),
    __metadata("design:returntype", Promise)
], OrderResolverBase.prototype, "_ordersMeta", null);
__decorate([
    graphql.Query(() => [Order_1.Order]),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderFindManyArgs_1.OrderFindManyArgs, Array]),
    __metadata("design:returntype", Promise)
], OrderResolverBase.prototype, "orders", null);
__decorate([
    graphql.Query(() => Order_1.Order, { nullable: true }),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "read",
        possession: "own",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderFindUniqueArgs_1.OrderFindUniqueArgs, Array]),
    __metadata("design:returntype", Promise)
], OrderResolverBase.prototype, "order", null);
__decorate([
    graphql.Mutation(() => Order_1.Order),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "create",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderArgs_1.CreateOrderArgs, Array]),
    __metadata("design:returntype", Promise)
], OrderResolverBase.prototype, "createOrder", null);
__decorate([
    graphql.Mutation(() => Order_1.Order),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "update",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateOrderArgs_1.UpdateOrderArgs, Array]),
    __metadata("design:returntype", Promise)
], OrderResolverBase.prototype, "updateOrder", null);
__decorate([
    graphql.Mutation(() => Order_1.Order),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "delete",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteOrderArgs_1.DeleteOrderArgs]),
    __metadata("design:returntype", Promise)
], OrderResolverBase.prototype, "deleteOrder", null);
__decorate([
    graphql.ResolveField(() => Customer_1.Customer, { nullable: true }),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Parent()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Order_1.Order, Array]),
    __metadata("design:returntype", Promise)
], OrderResolverBase.prototype, "customer", null);
__decorate([
    graphql.ResolveField(() => Product_1.Product, { nullable: true }),
    nestAccessControl.UseRoles({
        resource: "Order",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Parent()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Order_1.Order, Array]),
    __metadata("design:returntype", Promise)
], OrderResolverBase.prototype, "product", null);
OrderResolverBase = __decorate([
    graphql.Resolver(() => Order_1.Order),
    common.UseGuards(gqlDefaultAuth_guard_1.GqlDefaultAuthGuard, gqlACGuard.GqlACGuard),
    __metadata("design:paramtypes", [order_service_1.OrderService, nestAccessControl.RolesBuilder])
], OrderResolverBase);
exports.OrderResolverBase = OrderResolverBase;
//# sourceMappingURL=order.resolver.base.js.map