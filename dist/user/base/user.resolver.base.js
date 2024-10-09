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
exports.UserResolverBase = void 0;
const common = __importStar(require("@nestjs/common"));
const graphql = __importStar(require("@nestjs/graphql"));
const nestAccessControl = __importStar(require("nest-access-control"));
const gqlDefaultAuth_guard_1 = require("../../auth/gqlDefaultAuth.guard");
const gqlACGuard = __importStar(require("../../auth/gqlAC.guard"));
const gqlUserRoles = __importStar(require("../../auth/gqlUserRoles.decorator"));
const abacUtil = __importStar(require("../../auth/abac.util"));
const prisma_util_1 = require("../../prisma.util");
const MetaQueryPayload_1 = require("../../util/MetaQueryPayload");
const CreateUserArgs_1 = require("./CreateUserArgs");
const UpdateUserArgs_1 = require("./UpdateUserArgs");
const DeleteUserArgs_1 = require("./DeleteUserArgs");
const UserFindManyArgs_1 = require("./UserFindManyArgs");
const UserFindUniqueArgs_1 = require("./UserFindUniqueArgs");
const User_1 = require("./User");
const user_service_1 = require("../user.service");
const graphql_1 = require("graphql");
let UserResolverBase = class UserResolverBase {
    constructor(service, rolesBuilder) {
        this.service = service;
        this.rolesBuilder = rolesBuilder;
    }
    async _usersMeta(args) {
        const results = await this.service.count({
            ...args,
            skip: undefined,
            take: undefined,
        });
        return {
            count: results,
        };
    }
    async users(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "any",
            resource: "User",
        });
        const results = await this.service.findMany(args);
        return results.map((result) => permission.filter(result));
    }
    async user(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "read",
            possession: "own",
            resource: "User",
        });
        const result = await this.service.findOne(args);
        if (result === null) {
            return null;
        }
        return permission.filter(result);
    }
    async createUser(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "create",
            possession: "any",
            resource: "User",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, args.data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new graphql_1.GraphQLError(`providing the properties: ${properties} on ${"User"} creation is forbidden for roles: ${roles}`);
        }
        return await this.service.create({
            ...args,
            data: args.data,
        });
    }
    async updateUser(args, userRoles) {
        const permission = this.rolesBuilder.permission({
            role: userRoles,
            action: "update",
            possession: "any",
            resource: "User",
        });
        const invalidAttributes = abacUtil.getInvalidAttributes(permission, args.data);
        if (invalidAttributes.length) {
            const properties = invalidAttributes
                .map((attribute) => JSON.stringify(attribute))
                .join(", ");
            const roles = userRoles
                .map((role) => JSON.stringify(role))
                .join(",");
            throw new graphql_1.GraphQLError(`providing the properties: ${properties} on ${"User"} update is forbidden for roles: ${roles}`);
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
    async deleteUser(args) {
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
};
__decorate([
    graphql.Query(() => MetaQueryPayload_1.MetaQueryPayload),
    nestAccessControl.UseRoles({
        resource: "User",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserFindManyArgs_1.UserFindManyArgs]),
    __metadata("design:returntype", Promise)
], UserResolverBase.prototype, "_usersMeta", null);
__decorate([
    graphql.Query(() => [User_1.User]),
    nestAccessControl.UseRoles({
        resource: "User",
        action: "read",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserFindManyArgs_1.UserFindManyArgs, Array]),
    __metadata("design:returntype", Promise)
], UserResolverBase.prototype, "users", null);
__decorate([
    graphql.Query(() => User_1.User, { nullable: true }),
    nestAccessControl.UseRoles({
        resource: "User",
        action: "read",
        possession: "own",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserFindUniqueArgs_1.UserFindUniqueArgs, Array]),
    __metadata("design:returntype", Promise)
], UserResolverBase.prototype, "user", null);
__decorate([
    graphql.Mutation(() => User_1.User),
    nestAccessControl.UseRoles({
        resource: "User",
        action: "create",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserArgs_1.CreateUserArgs, Array]),
    __metadata("design:returntype", Promise)
], UserResolverBase.prototype, "createUser", null);
__decorate([
    graphql.Mutation(() => User_1.User),
    nestAccessControl.UseRoles({
        resource: "User",
        action: "update",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __param(1, gqlUserRoles.UserRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateUserArgs_1.UpdateUserArgs, Array]),
    __metadata("design:returntype", Promise)
], UserResolverBase.prototype, "updateUser", null);
__decorate([
    graphql.Mutation(() => User_1.User),
    nestAccessControl.UseRoles({
        resource: "User",
        action: "delete",
        possession: "any",
    }),
    __param(0, graphql.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteUserArgs_1.DeleteUserArgs]),
    __metadata("design:returntype", Promise)
], UserResolverBase.prototype, "deleteUser", null);
UserResolverBase = __decorate([
    graphql.Resolver(() => User_1.User),
    common.UseGuards(gqlDefaultAuth_guard_1.GqlDefaultAuthGuard, gqlACGuard.GqlACGuard),
    __metadata("design:paramtypes", [user_service_1.UserService, nestAccessControl.RolesBuilder])
], UserResolverBase);
exports.UserResolverBase = UserResolverBase;
//# sourceMappingURL=user.resolver.base.js.map