import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { maxMatrixRows, maxMatrixColumns, matrixSizeWrongMesssage } from 'app/constants/globals';

@Injectable()
export class MainPageRouteActivator implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let matrixN = +route.params["N"];
        let matrixM = +route.params["M"];

        if(isNaN(matrixN) || isNaN(matrixM)){
             this.router.navigate(['/first-page']);
             return false;
        } else if((matrixN > maxMatrixRows) || (matrixM > maxMatrixColumns)) {
            alert(matrixSizeWrongMesssage);
            this.router.navigate(['/first-page', matrixN, matrixM]);
            return false;
        }

        return true;
    }
}