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
exports.FloatNullableFilter = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let FloatNullableFilter = class FloatNullableFilter {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Object)
], FloatNullableFilter.prototype, "equals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: [Number],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => [graphql_1.Float], {
        nullable: true,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Object)
], FloatNullableFilter.prototype, "in", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: [Number],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => [graphql_1.Float], {
        nullable: true,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Object)
], FloatNullableFilter.prototype, "notIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FloatNullableFilter.prototype, "lt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FloatNullableFilter.prototype, "lte", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FloatNullableFilter.prototype, "gt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FloatNullableFilter.prototype, "gte", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FloatNullableFilter.prototype, "not", void 0);
FloatNullableFilter = __decorate([
    (0, graphql_1.InputType)({
        isAbstract: true,
        description: undefined,
    })
], FloatNullableFilter);
exports.FloatNullableFilter = FloatNullableFilter;
//# sourceMappingURL=FloatNullableFilter.js.map