import { Injectable } from '@angular/core';
import { Cell } from 'app/classes/Cell';
import { colorPalette } from 'app/constants/colorPalette';

@Injectable()
export class DomainsService {

  visitedCells: boolean[][];
  currentRow: Cell[];
  currentCell:Cell;
  currentColor: string;
  c: number;
  r: number;
  domains: number[][][];
  domainsToJoin: { i: number, domain: number[][] }[];
  
  public matrix: Cell[][];
  
  constructor() { }

  public countDomains():number
  {
    var domainsCount = 0;    
    this.visitedCells = [];
    this.currentColor = colorPalette[0];
  
    for(this.r = 0; this.r < this.matrix.length; this.r++)
    {
      this.currentRow = this.matrix[this.r];
      for(this.c = 0; this.c < this.currentRow.length; this.c++)
      {
        this.currentCell = this.currentRow[this.c];
        if(this.explore((c, r) => {})) {
          domainsCount++;
          this.currentColor = colorPalette[domainsCount % colorPalette.length];
        }
      }
    }

    return domainsCount;
  }

  public findDomains():number[][][]
  {
    var domainsCount = 0;
    this.domains = [];
    this.visitedCells = []; 
    this.currentColor = colorPalette[0];
  
    for(this.r = 0; this.r < this.matrix.length; this.r++)
    {
      this.currentRow = this.matrix[this.r];
      for(this.c = 0; this.c < this.currentRow.length; this.c++)
      {
        this.currentCell = this.currentRow[this.c];
        if(this.explore((c, r) => {
          if(!this.domains[domainsCount])
            this.domains[domainsCount] = [];
            this.domains[domainsCount].push([r, c]);
        })) {
          domainsCount++;
          this.currentColor = colorPalette[domainsCount % colorPalette.length];
        }
      }
    }

    return this.domains;
  }

  private tryToJoinBy(r: number, c: number) {
    let d = this.findDomainByItem([r, c]);
    if(d) {
      this.currentCell.includeToDomain(this.matrix[r][c].Color);
      if(this.domainsToJoin.filter(x => x.i == d.i).length === 0) {
        this.domainsToJoin.push(d);
        if(this.domainsToJoin.length === 1) {
          d.domain.push([this.r, this.c]);
        }
      }
    }
  }

  private exploreNewDomain(r: number, c: number) {
    this.r = r;
    this.c = c;
    this.currentCell = this.matrix[r][c];
    if(this.currentCell){
      this.currentColor = this.currentCell.Color;
      let domainsCount = this.domains.length;
      if(this.exploreFull((c, r) => {
        if(!this.domains[domainsCount]){
          this.domains[domainsCount] = [];
          this.currentColor = colorPalette[(this.domains.length-1) % colorPalette.length]; 
        }
        this.domains[domainsCount].push([r, c]);
        this.currentCell.includeToDomain(this.currentColor);
      })) {
      }
    }
  }
  
  public recalculateDomains(r: number, c: number) {
    this.visitedCells = [];
    this.r = r;
    this.c = c;
    this.currentCell = this.matrix[r][c];
    
    if(this.matrix[r][c] && this.matrix[r][c].Value) {
      this.domainsToJoin = [];
      if(this.matrix[r-1] && this.matrix[r-1][c] && this.matrix[r-1][c].Value) {
        this.tryToJoinBy(r-1, c)
      } 
      if(this.matrix[r] && this.matrix[r][c-1] && this.matrix[r][c-1].Value) {
        this.tryToJoinBy(r, c-1)
      }
      if(this.matrix[r+1] && this.matrix[r+1][c] && this.matrix[r+1][c].Value) {
        this.tryToJoinBy(r+1, c)
      }
      if(this.matrix[r] && this.matrix[r][c+1] && this.matrix[r][c+1].Value) {
        this.tryToJoinBy(r, c+1)
      }
      if(this.domainsToJoin.length > 1){
        for(var i = 1; i < this.domainsToJoin.length; i++){
          this.domainsToJoin[i].domain.forEach(el => {
            if(this.domainsToJoin[0].domain.indexOf(el) === -1){
              this.domainsToJoin[0].domain.push(el);
            }
          });
          this.domains[this.domainsToJoin[0].i] = this.domainsToJoin[0].domain;
          let domainToJoin = this.domains[this.domainsToJoin[0].i];
          domainToJoin.forEach(el => {
            let firstItemFromDomain = domainToJoin[0];
            this.matrix[el[0]][el[1]].includeToDomain(this.matrix[firstItemFromDomain[0]][firstItemFromDomain[1]].Color);
          });

          if(this.domains.indexOf(this.domainsToJoin[i].domain) !== -1)
          this.domains.splice(this.domains.indexOf(this.domainsToJoin[i].domain), 1);
        }
      } 
      if(this.domainsToJoin.length === 0) {
        if(!this.domains) this.domains = [];
        this.domains[this.domains.length] = [[r,c]];
        this.matrix[r][c].includeToDomain(colorPalette[(this.domains.length-1) % colorPalette.length]);
      }
    } else if(this.matrix[r][c] && !this.matrix[r][c].Value) {
      this.matrix[r][c] = new Cell();
      let domainToSplit = this.findDomainByItem([r,c]);
      if(!!domainToSplit) {
        let domainIndexToDelete = this.domains.indexOf(this.domains[domainToSplit.i]);
        let itemIndexToDelete = this.domains[domainToSplit.i].indexOf(this.domains[domainToSplit.i][domainToSplit.j]);
        if(domainToSplit.domain.length > 1){
          this.domains.splice(domainIndexToDelete, 1);
          var domainsCount = this.domains.length;
          if(this.matrix[r-1] && this.matrix[r-1][c] && this.matrix[r-1][c].Value) {
            this.exploreNewDomain(r-1, c);
          }
          if(this.matrix[r] && this.matrix[r][c-1] && this.matrix[r][c-1].Value) {
            this.exploreNewDomain(r, c-1);
          }
          if(this.matrix[r+1] && this.matrix[r+1][c] && this.matrix[r+1][c].Value) {
            this.exploreNewDomain(r+1, c);
          }
          if(this.matrix[r] && this.matrix[r][c+1] && this.matrix[r][c+1].Value) {
            this.exploreNewDomain(r, c+1);
          }
        }
        else {
          this.domains.splice(domainIndexToDelete, 1);
        }
      }
    }

    this.domains = this.domains.filter((item, i) => {
      return this.domains.indexOf(item) == i;
    });

    // reapply colors    
    for(var i = 0; i < this.domains.length; i++) {
      this.domains[i].forEach(el => {
        this.matrix[el[0]][el[1]].includeToDomain(colorPalette[i % colorPalette.length]);
      });
    }
  }

  public findDomainByItem(itemToFind: number[]): { i: number, j: number, domain: number[][] } {
    for(var i = 0; i < this.domains.length; i++) {
      for(var j = 0; j < this.domains[i].length; j++) {
        if(this.domains[i][j][0] == itemToFind[0] 
          && this.domains[i][j][1] == itemToFind[1]) {
            return { i, j, domain: this.domains[i] } ;
        }
      }
    }

    return null;;
  }

  public get Domains(): number[][][] {
    return this.domains;
  }

  private explore(includeToDomain: (c: number, r: number) => void): boolean
  {
    if(this.isVisited(this.c, this.r)) return false;

    if(this.currentCell.Value)
    {
      this.currentCell.includeToDomain(this.currentColor);
      includeToDomain(this.c, this.r);
      this.exploreBy(this.c, this.r+1, includeToDomain);
      this.c += this.exploreBy(this.c+1, this.r, includeToDomain);
    }

    return !!this.currentCell.Value;
  }

  private exploreFull(includeToDomain: (c: number, r: number) => void): boolean
  {
    if(this.isVisited(this.c, this.r)) return false;

    if(this.currentCell.Value)
    {
      this.currentCell.includeToDomain(this.currentColor);
      includeToDomain(this.c, this.r);
      this.exploreBy(this.c-1, this.r, includeToDomain);
      this.exploreBy(this.c, this.r-1, includeToDomain);
      this.exploreBy(this.c, this.r+1, includeToDomain);
      this.c += this.exploreBy(this.c+1, this.r, includeToDomain);
    }

    return !!this.currentCell.Value;
  }

  private exploreBy(c1:number, r1:number, includeToDomain: (c: number, r: number) => void):number
  {
    if(c1>=0 && r1>=0
      && r1<this.matrix.length
      && c1<this.matrix[r1].length
      && !this.isVisited(c1, r1)
      && this.matrix[r1][c1].Value)
    {
      this.matrix[r1][c1].includeToDomain(this.currentColor);
      includeToDomain(c1, r1);
      this.exploreBy(c1 - 1, r1, includeToDomain);
      this.exploreBy(c1, r1 - 1, includeToDomain);
      this.exploreBy(c1, r1 + 1, includeToDomain);

      return this.exploreBy(c1 + 1, r1, includeToDomain) + 1;
    }

    return 0;
  }

  private isVisited(c:number, r:number):boolean
  {
    let visitedRow = this.visitedCells[r];
    if(!visitedRow) this.visitedCells[r] = visitedRow = [];
    let result = !!visitedRow[c];
    visitedRow[c] = true;

    return result;
  }
}
