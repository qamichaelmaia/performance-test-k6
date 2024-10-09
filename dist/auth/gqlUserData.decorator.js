"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = exports.getUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
function getUser(executionContext) {
    const gqlExecutionContext = graphql_1.GqlExecutionContext.create(executionContext);
    return gqlExecutionContext.getContext().req.user;
}
exports.getUser = getUser;
exports.UserData = (0, common_1.createParamDecorator)((data, ctx) => getUser(ctx));
//# sourceMappingURL=gqlUserData.decorator.js.map