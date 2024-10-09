"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const OrderWhereUniqueInput_1 = require("./OrderWhereUniqueInput");
const OrderUpdateInput_1 = require("./OrderUpdateInput");
let UpdateOrderArgs = class UpdateOrderArgs {
};
__decorate([
    (0, graphql_1.Field)(() => OrderWhereUniqueInput_1.OrderWhereUniqueInput, { nullable: false }),
    __metadata("design:type", OrderWhereUniqueInput_1.OrderWhereUniqueInput)
], UpdateOrderArgs.prototype, "where", void 0);
__decorate([
    (0, graphql_1.Field)(() => OrderUpdateInput_1.OrderUpdateInput, { nullable: false }),
    __metadata("design:type", OrderUpdateInput_1.OrderUpdateInput)
], UpdateOrderArgs.prototype, "data", void 0);
UpdateOrderArgs = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateOrderArgs);
exports.UpdateOrderArgs = UpdateOrderArgs;
//# sourceMappingURL=UpdateOrderArgs.js.map