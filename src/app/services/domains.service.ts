import { Injectable } from '@angular/core';
import { Cell } from 'app/classes/Cell';
import { colorPalette } from 'app/constants/colorPalette';

@Injectable()
export class DomainsService {

  constructor() { }

  public findDomains(matrix:Cell[][]):number
  {
    var c: number, r: number;
    var currentRow: Cell[], currentCell:Cell;
    var visitedCells: boolean[][] = [];
    var domainsCount = 0;    
    var currentColor = colorPalette[0];
  
    for(r = 0; r < matrix.length; r++)
    {
      currentRow = matrix[r];
      for(c = 0; c < currentRow.length; c++)
      {
        currentCell = currentRow[c];
        if(explore()) {
          domainsCount++;
          currentColor = colorPalette[domainsCount % colorPalette.length];
        }
      }
    }
  
    function explore():boolean
    {
      if(isVisited(c, r)) return false;
  
      if(currentCell.Value)
      {
        currentCell.includeToDomain(currentColor);
        exploreBy(c, r + 1);
        c += exploreBy(c + 1, r);
      }
  
      return !!currentCell.Value;
    }
  
    function exploreBy(c1:number, r1:number):number
    {
      if(c1>=0 && r1>=0
        && r1<matrix.length
        && c1<matrix[r1].length
        && !isVisited(c1, r1)
        && matrix[r1][c1].Value)
      {
        matrix[r1][c1].includeToDomain(currentColor);;
        exploreBy(c1 - 1, r1);
        exploreBy(c1, r1 - 1);
        exploreBy(c1, r1 + 1);
  
        return exploreBy(c1 + 1, r1) + 1;
      }
  
      return 0;
    }

    function isVisited(c:number, r:number):boolean
    {
      let visitedRow = visitedCells[r];
      if(!visitedRow) visitedCells[r] = visitedRow = [];
      let result = !!visitedRow[c];
      visitedRow[c] = true;

      return result;
    }
  
    return domainsCount;
  }
}
