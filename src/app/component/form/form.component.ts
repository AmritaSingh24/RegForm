import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  regForm!: FormGroup; 
  disabled! : string; 
  removeBtn: string = "disabledBtn"; // for remove btn

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.regForm = this.fb.group({
       name: ['', [Validators.required]],
       age: ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
       email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
       phone : ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[6-9][0-9]{9}$')]],
       occupation: ['', [Validators.required]],
       addressItems: this.fb.array([this.addresses()], [Validators.required]), // create formArray
       checkBox: [false, Validators.requiredTrue],
       recaptcha: ['', Validators.required]
    });
  }

  get formArr(){
    return this.regForm.get('addressItems') as FormArray // get formArray
  }

  addresses(){
    return  this.fb.group({
      addressLine1: ['', [Validators.required, Validators.minLength(3)]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      disabled: [false]
    });
  }
  
  // add more address fields
  addMoreAddress(){
    this.formArr.push(this.addresses());
    //this.disabled = "disabledBtn";
    this.removeBtn = "alertBtn";
    console.log(this.formArr.value)
  }

  //delete added address fields
  deleteAddress(index:number){
    this.formArr.removeAt(index);
  }

  //Submit registration form
  clickSubmit(){
    console.log(this.regForm.value)
    this.regForm.reset();
  }

  siteKey:string = "6LfxSdAdAAAAAM8vW3t2kvpQDoX2srJKjQuonBpf"; // recaptcha

  ngOnInit(): void {
    console.log(this.regForm.value.checkBox = true) // get reactive form value
  }

}
