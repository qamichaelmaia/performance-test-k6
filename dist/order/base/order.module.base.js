"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModuleBase = void 0;
const common_1 = require("@nestjs/common");
const nest_morgan_1 = require("nest-morgan");
const nestjs_prisma_1 = require("nestjs-prisma");
const acl_module_1 = require("../../auth/acl.module");
const auth_module_1 = require("../../auth/auth.module");
let OrderModuleBase = class OrderModuleBase {
};
OrderModuleBase = __decorate([
    (0, common_1.Module)({
        imports: [
            acl_module_1.ACLModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            nest_morgan_1.MorganModule,
            nestjs_prisma_1.PrismaModule,
        ],
        exports: [acl_module_1.ACLModule, auth_module_1.AuthModule, nest_morgan_1.MorganModule, nestjs_prisma_1.PrismaModule],
    })
], OrderModuleBase);
exports.OrderModuleBase = OrderModuleBase;
//# sourceMappingURL=order.module.base.js.map