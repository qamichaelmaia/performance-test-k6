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
exports.ProductFindManyArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const ProductWhereInput_1 = require("./ProductWhereInput");
const class_transformer_1 = require("class-transformer");
const ProductOrderByInput_1 = require("./ProductOrderByInput");
let ProductFindManyArgs = class ProductFindManyArgs {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: () => ProductWhereInput_1.ProductWhereInput,
    }),
    (0, graphql_1.Field)(() => ProductWhereInput_1.ProductWhereInput, { nullable: true }),
    (0, class_transformer_1.Type)(() => ProductWhereInput_1.ProductWhereInput),
    __metadata("design:type", ProductWhereInput_1.ProductWhereInput)
], ProductFindManyArgs.prototype, "where", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: ProductOrderByInput_1.ProductOrderByInput,
    }),
    (0, graphql_1.Field)(() => ProductOrderByInput_1.ProductOrderByInput, { nullable: true }),
    (0, class_transformer_1.Type)(() => ProductOrderByInput_1.ProductOrderByInput),
    __metadata("design:type", ProductOrderByInput_1.ProductOrderByInput)
], ProductFindManyArgs.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
    }),
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ProductFindManyArgs.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
    }),
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ProductFindManyArgs.prototype, "take", void 0);
ProductFindManyArgs = __decorate([
    (0, graphql_1.ArgsType)()
], ProductFindManyArgs);
exports.ProductFindManyArgs = ProductFindManyArgs;
//# sourceMappingURL=ProductFindManyArgs.js.map