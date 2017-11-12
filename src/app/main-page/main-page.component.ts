import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomainsService } from '../services/domains.service';
import { Cell } from '../classes/Cell';

@Component({
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  matrixN: number;
  matrixM: number;

  matrix: Cell[][];
  domainsCount: number;
  executionTime: number;
  domains: number[][][];

  constructor(
    private domainsService: DomainsService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.matrixN = +this.route.snapshot.params['N'];
    this.matrixM = +this.route.snapshot.params['M'];
    this.matrix = [];
    this.domains = [];
    this.domainsCount = 0;
    this.executionTime = 0;
    for(var i = 0; i < this.matrixN; i++){
      this.matrix[i] = [];
      for(var j = 0; j < this.matrixM; j++){
        this.matrix[i][j] = new Cell();
      }
    }
  }

  switchCell(i: number, j: number) {
    this.matrix[i][j].switch();
    this.domainsService.matrix = this.matrix;    
    this.domainsService.recalculateDomains(i, j);
    this.domains = this.domainsService.Domains;
    this.domainsCount = this.domains.length;
  }

  findDomains() {
    for(var i = 0; i < this.matrixN; i++){
      for(var j = 0; j < this.matrixM; j++){
        this.matrix[i][j].excludeFromDomain();
      }
    }
    var start = new Date().getTime();
    this.domainsService.matrix = this.matrix;
    this.domains = this.domainsService.findDomains();
    this.domainsCount = this.domains.length;
    var end = new Date().getTime();
    this.executionTime = end - start;
  }

  back() {
    this.router.navigate(["/first-page", this.matrixN, this.matrixM]);
  }
}
