"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const common_1 = require("@nestjs/common");
const address_module_base_1 = require("./base/address.module.base");
const address_service_1 = require("./address.service");
const address_controller_1 = require("./address.controller");
const address_resolver_1 = require("./address.resolver");
let AddressModule = class AddressModule {
};
AddressModule = __decorate([
    (0, common_1.Module)({
        imports: [address_module_base_1.AddressModuleBase],
        controllers: [address_controller_1.AddressController],
        providers: [address_service_1.AddressService, address_resolver_1.AddressResolver],
        exports: [address_service_1.AddressService],
    })
], AddressModule);
exports.AddressModule = AddressModule;
//# sourceMappingURL=address.module.js.map