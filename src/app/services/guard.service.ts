import { inject } from "@angular/core";
import { AuthorizationComponent } from "../authorization/authorization.component";
import { AuthServiceService } from "./auth-service.service";

export const guard = () => {
 return  Boolean(sessionStorage.getItem("isAuthenticated")) 
}

