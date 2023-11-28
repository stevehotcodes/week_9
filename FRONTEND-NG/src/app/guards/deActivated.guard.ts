import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivateFn, CanDeactivate, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';


@Injectable({
	providedIn: 'root'
})
export class DeactivateGuard implements CanActivate {
	constructor(private router: Router, private userSvc: UserService) { }

	canActivate(): Observable<boolean> {
		return this.userSvc.getSignedInUser().pipe(
			switchMap(result => {
				const canActivate = !result.role ? true : false
				if (canActivate) {                    
                    return of(true)
				} else {
                    this.router.navigate([''])
					return of(false)
				}
			}),
			catchError(error => {
				// this.router.navigate([''])
				return of(true)
			})
		)
	}
}