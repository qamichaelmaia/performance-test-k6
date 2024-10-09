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
exports.UpdateCustomerArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const CustomerWhereUniqueInput_1 = require("./CustomerWhereUniqueInput");
const CustomerUpdateInput_1 = require("./CustomerUpdateInput");
let UpdateCustomerArgs = class UpdateCustomerArgs {
};
__decorate([
    (0, graphql_1.Field)(() => CustomerWhereUniqueInput_1.CustomerWhereUniqueInput, { nullable: false }),
    __metadata("design:type", CustomerWhereUniqueInput_1.CustomerWhereUniqueInput)
], UpdateCustomerArgs.prototype, "where", void 0);
__decorate([
    (0, graphql_1.Field)(() => CustomerUpdateInput_1.CustomerUpdateInput, { nullable: false }),
    __metadata("design:type", CustomerUpdateInput_1.CustomerUpdateInput)
], UpdateCustomerArgs.prototype, "data", void 0);
UpdateCustomerArgs = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateCustomerArgs);
exports.UpdateCustomerArgs = UpdateCustomerArgs;
//# sourceMappingURL=UpdateCustomerArgs.js.map