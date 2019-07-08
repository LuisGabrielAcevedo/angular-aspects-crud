import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const resourcesAvailable: string[] = ['users', 'countries', 'states'];
      const resource: string = next.paramMap.get('resource')!;
      if (!resourcesAvailable.includes(resource)) { this.router.navigate(['']); }
      return resourcesAvailable.includes(resource);
  }
}
