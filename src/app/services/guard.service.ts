import { inject } from "@angular/core"
import { AuthServiceService } from "./auth-service.service";
import { AuthorizationComponent } from "../authorization/authorization.component";

export const guard  =  () => {
    let auth = inject(AuthorizationComponent);
    return true;
}

