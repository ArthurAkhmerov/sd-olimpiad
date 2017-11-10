/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DomainsService } from './domains.service';
import { Cell } from 'app/classes/Cell';

describe('DomainsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomainsService]
    });
  });

  it('should ...', inject([DomainsService], (service: DomainsService) => {
    expect(service).toBeTruthy();
  }));

  it('should find a domain', inject([DomainsService], (service: DomainsService) => {
    const matrix : number[][] = [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ];
    let domainsCount = service.findDomains(mapMatrix(matrix));

    expect(domainsCount).toBe(1);
  }));

  it('should find 2 domains', inject([DomainsService], (service: DomainsService) => {
    const matrix : number[][] = [
      [1, 1, 1],
      [0, 0, 0],
      [0, 1, 1],
    ];
    let domainsCount = service.findDomains(mapMatrix(matrix));

    expect(domainsCount).toBe(2);
  }));

  it('should find 5 domains', inject([DomainsService], (service: DomainsService) => {
    const matrix : number[][] = [
      [1, 1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0],
    ];
    let domainsCount = service.findDomains(mapMatrix(matrix));

    expect(domainsCount).toBe(5);
  }));

  it('should find a domain', inject([DomainsService], (service: DomainsService) => {
    let domainsCount = service.findDomains(mapMatrix([[1]]));

    expect(domainsCount).toBe(1);
  }));


  it('should find no domains', inject([DomainsService], (service: DomainsService) => {
    let domainsCount = service.findDomains(mapMatrix([[0]]));
    
    expect(domainsCount).toBe(0);
  }));

  function mapMatrix(matrix: number[][]): Cell[][]{
    let result: Cell[][] = [];
    for(var i = 0; i < matrix.length; i++){
      result[i] = [];
      for(var j = 0; j < matrix[i].length; j++){
        result[i][j] = new Cell(!!matrix[i][j]);
      }
    }

    return result;
  }
});
