import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class SessionGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean {
        const request = context.switchToHttp().getRequest();
        console.log(request.session);
        return request.session.email != undefined;
    }
}