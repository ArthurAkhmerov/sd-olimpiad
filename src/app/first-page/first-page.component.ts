import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NumberValidator } from '../validators/number.validator';

import { maxMatrixRows, maxMatrixColumns, matrixSizeWrongMesssage } from '../constants/globals';

@Component({
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  matrixN: FormControl;
  matrixM: FormControl;
  firstPageForm : FormGroup;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.matrixN = new FormControl(10, [Validators.required, NumberValidator({min:0,max:maxMatrixRows})]);
    this.matrixM = new FormControl(10, [Validators.required, NumberValidator({min:0,max:maxMatrixColumns})]);

    if(this.route.snapshot.params['N'] && this.route.snapshot.params['M']){
      this.matrixN.setValue(+this.route.snapshot.params['N']);
      this.matrixM.setValue(+this.route.snapshot.params['M']);
    }

    this.firstPageForm = new FormGroup({
      matrixN: this.matrixN,
      matrixM: this.matrixM,
    });
  }

  validateMatrixN(){
    return this.matrixN.valid;
  }

  validateMatrixM(){
    return this.matrixM.valid;
  }

  submit(formValues) {
    if(this.firstPageForm.valid){
      this.router.navigate(["/main-page", formValues.matrixN, formValues.matrixM]);      
    }
  }

  public get matrixSizeWrongMesssage(){
    return matrixSizeWrongMesssage;
  }
}
