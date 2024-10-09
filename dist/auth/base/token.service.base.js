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
exports.TokenServiceBase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
let TokenServiceBase = class TokenServiceBase {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    createToken(username, password) {
        if (!username)
            return Promise.reject(constants_1.INVALID_USERNAME_ERROR);
        if (!password)
            return Promise.reject(constants_1.INVALID_PASSWORD_ERROR);
        return this.jwtService.signAsync({ username });
    }
};
TokenServiceBase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TokenServiceBase);
exports.TokenServiceBase = TokenServiceBase;
//# sourceMappingURL=token.service.base.js.map