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
exports.ProductResolverBase = void 0;
const common = __importStar(require("@nestjs/common"));
const graphql = __importStar(require("@nestjs/graphql"));
const nestAccessControl = __importStar(require("nest-access-control"));
const gqlDefaultAuth_guard_1 = require("../../auth/gqlDefaultAuth.guard");
const gqlACGuard = __importStar(require("../../auth/gqlAC.guard"));
const gqlUserRoles = __importStar(require("../../auth/gqlUserRoles.decorator"));
const abacUtil = __importStar(require("../../auth/abac.util"));
const prisma_util_1 = require("../../prisma.util");
const MetaQueryPayload_1 = require("../../util/MetaQueryPayload");
const CreateProductArgs_1 = require("./CreateProductArgs");
const UpdateProductArgs_1 = require("./UpdateProductArgs");
const DeleteProductArgs_1 = require("./DeleteProductArgs");
const ProductFindManyArgs_1 = require("./ProductFindManyArgs");
const ProductFindUniqueArgs_1 = require("./ProductFindUniqueArgs");
const Product_1 = require("./Product");
const OrderFindManyArgs_1 = require("../../order/base/OrderFindManyArgs");
const Order_1 = require("../../order/base/Order");
const product_service_1 = require("../product.service");
const graphql_1 = require("graphql");
let ProductResolverBase = class ProductResolverBase {
    constructor(service, rolesBuilder) {
        this.service = service;
        this.rolesBuilder = rolesBuilder;
    }
    async _productsMeta(args) {
        const results = await this.service.count({
            ...args,
            skip: undefined,
            take: undefined,
        });
        return {
            count: results,
        };
    }
    async products(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "Product",
        });
        const results = await this.service.findMany(args);
        return results.map((result) => permission.filter(result));
    }
    async product(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "own",
            resource: "Product",
        });
        const result = await this.service.findOne(args);
        if (result === null) {
            return null;
        }
        return permission.filter(result);
    }
    async createProduct(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "create",
            possession: "any",
            resource: "Product",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, args.data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new graphql_1.GraphQLError(`providing the properties: ${properties} on ${"Product"} creation is forbidden for roles: ${roles}`);
        }
        return await this.service.create({
            ...args,
            data: args.data,
        });
    }
    async updateProduct(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "Product",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, args.data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new graphql_1.GraphQLError(`providing the properties: ${properties} on ${"Product"} update is forbidden for roles: ${roles}`);
        }
        try {
            return await this.service.update({
                ...args,
                data: args.data,
            });
        }
        catch (error) {
            if ((0, prisma_util_1.isRecordNotFoundError)(error)) {
                throw new graphql_1.GraphQLError(`No resource was found for ${JSON.stringify(args.where)}`);
            }
            throw error;
        }
    }
    async deleteProduct(args) {
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
};
__decorate([
    graphql.Query(() => MetaQueryPayload_1.MetaQueryPayload),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductFindManyArgs_1.ProductFindManyArgs]),
    __metadata("design:returntype", Promise)
], ProductResolverBase.prototype, "_productsMeta", null);
__decorate([
    graphql.Query(() => [Product_1.Product]),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductFindManyArgs_1.ProductFindManyArgs, Array]),
    __metadata("design:returntype", Promise)
], ProductResolverBase.prototype, "products", null);
__decorate([
    graphql.Query(() => Product_1.Product, { nullable: true }),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "read",
        possession: "own",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductFindUniqueArgs_1.ProductFindUniqueArgs, Array]),
    __metadata("design:returntype", Promise)
], ProductResolverBase.prototype, "product", null);
__decorate([
    graphql.Mutation(() => Product_1.Product),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "create",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductArgs_1.CreateProductArgs, Array]),
    __metadata("design:returntype", Promise)
], ProductResolverBase.prototype, "createProduct", null);
__decorate([
    graphql.Mutation(() => Product_1.Product),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "update",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateProductArgs_1.UpdateProductArgs, Array]),
    __metadata("design:returntype", Promise)
], ProductResolverBase.prototype, "updateProduct", null);
__decorate([
    graphql.Mutation(() => Product_1.Product),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "delete",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteProductArgs_1.DeleteProductArgs]),
    __metadata("design:returntype", Promise)
], ProductResolverBase.prototype, "deleteProduct", null);
__decorate([
    graphql.ResolveField(() => [Order_1.Order]),
    nestAccessControl.UseRoles({
        resource: "Product",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Parent()),
    __param(1, graphql.Args()),
    __param(2, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Product_1.Product,
        OrderFindManyArgs_1.OrderFindManyArgs, Array]),
    __metadata("design:returntype", Promise)
], ProductResolverBase.prototype, "orders", null);
ProductResolverBase = __decorate([
    graphql.Resolver(() => Product_1.Product),
    common.UseGuards(gqlDefaultAuth_guard_1.GqlDefaultAuthGuard, gqlACGuard.GqlACGuard),
    __metadata("design:paramtypes", [product_service_1.ProductService, nestAccessControl.RolesBuilder])
], ProductResolverBase);
exports.ProductResolverBase = ProductResolverBase;
//# sourceMappingURL=product.resolver.base.js.map