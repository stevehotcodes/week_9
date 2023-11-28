// import { CanActivateFn } from '@angular/router';

// export const userGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn, CanDeactivateFn, CanActivate, CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';



@Injectable({
	providedIn: 'root'
})

export class UserGuard implements CanActivate {

	constructor(private router: Router, private userSvc: UserService) { }

	canActivate():boolean|Promise<boolean>| Observable<boolean> {
		return this.userSvc.getSignedInUser().pipe(
			switchMap(result => {
				const canActivate = result.role? true : false
				if (canActivate) {
					return of(true)
				} else {
					this.router.navigate([''])
					return of(false)
				}
			}),
			catchError(error => {
				this.router.navigate([''])
				return of(false)
			})
		)
	}



	
 }

//   canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean > | Promise<boolean >{
//     try{
//       if(this.authSvc.getUserSignInToken()){

//           return true
          
//       }
//       else{
//           this.router.navigate(['/signin'])
//           return false
//       }
//   }
//   catch{
//       throw new Error("Method not implemented.");
//   }
//   }

