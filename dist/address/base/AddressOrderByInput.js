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
exports.AddressOrderByInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const SortOrder_1 = require("../../util/SortOrder");
let AddressOrderByInput = class AddressOrderByInput {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: ["Asc", "Desc"],
    }),
    (0, graphql_1.Field)(() => SortOrder_1.SortOrder, {
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressOrderByInput.prototype, "address_1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: ["Asc", "Desc"],
    }),
    (0, graphql_1.Field)(() => SortOrder_1.SortOrder, {
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressOrderByInput.prototype, "address_2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: ["Asc", "Desc"],
    }),
    (0, graphql_1.Field)(() => SortOrder_1.SortOrder, {
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressOrderByInput.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: ["Asc", "Desc"],
    }),
    (0, graphql_1.Field)(() => SortOrder_1.SortOrder, {
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressOrderByInput.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: ["Asc", "Desc"],
    }),
    (0, graphql_1.Field)(() => SortOrder_1.SortOrder, {
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressOrderByInput.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: ["Asc", "Desc"],
    }),
    (0, graphql_1.Field)(() => SortOrder_1.SortOrder, {
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressOrderByInput.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: ["Asc", "Desc"],
    }),
    (0, graphql_1.Field)(() => SortOrder_1.SortOrder, {
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressOrderByInput.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: ["Asc", "Desc"],
    }),
    (0, graphql_1.Field)(() => SortOrder_1.SortOrder, {
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressOrderByInput.prototype, "zip", void 0);
AddressOrderByInput = __decorate([
    (0, graphql_1.InputType)({
        isAbstract: true,
        description: undefined,
    })
], AddressOrderByInput);
exports.AddressOrderByInput = AddressOrderByInput;
//# sourceMappingURL=AddressOrderByInput.js.map