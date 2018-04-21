import { MiddlewareFn } from "../interfaces/Middleware";
import { AuthChecker } from "../interfaces/auth-checker";
import { UnauthorizedError, ForbiddenError } from "../errors";

export function AuthMiddleware(authChecker: AuthChecker, roles: string[]): MiddlewareFn {
  return async (action, next) => {
    const accessGranted = await authChecker(action, roles);
    if (!accessGranted) {
      throw roles.length === 0 ? new UnauthorizedError() : new ForbiddenError();
    }
    return next();
  };
}
