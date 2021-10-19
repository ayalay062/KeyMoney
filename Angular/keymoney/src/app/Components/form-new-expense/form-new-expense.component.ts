import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Amuta } from 'src/app/Models/Amuta';
import { Expenses } from 'src/app/Models/Expenses';
import { Kinds } from 'src/app/Models/Kinds';
import { User_expense } from 'src/app/Models/User_expense';
import { AmutaService } from 'src/app/Service/amuta.service';
import { UserExOrInDetailsService } from 'src/app/Service/user-ex-or-in-details.service';


@Component({
  selector: 'myForm-new-expense',
  templateUrl: './form-new-expense.component.html',
  styleUrls: ['./form-new-expense.component.css']
})
export class FormNewExpenseComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private amutaSer: AmutaService,
    private ExInDetails: UserExOrInDetailsService) { }

  todaydate = new Date();
  submitted = false;
  myForm: FormGroup;
  allExpense: Expenses[];
  allKinds: Kinds[];
  allAmutot: Amuta[];
  expenseDetails: User_expense;


  ngOnInit(): void {
    this.reserForm();
    this.expenseDetails = this.ExInDetails.expenseDetails;

    this.myForm = this.fb.group({
      expenseDate: ['', Validators.required],
      expenseKind: ['', Validators.required],
      expenseCategory: ['', Validators.required],
      sum: ['', Validators.required],
    })

    this.amutaSer.getAmutaList().subscribe(success => {
      this.allAmutot = success;
    })
  }

  reserForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    // this.ExInDetails.expenseDetails = {
    //   id: 0,
    //   category: 0,
    //   dateOf_InOrExp: null,
    //   description: null,
    //   user: '',
    //   kindOfIncome: 0,
    //   Positive_Negative: 0
    // }
  }

  // onSubmit(myForm: NgForm) {
  //   this.ExInDetails.addVirus_info(myForm.value).subscribe(res => {
  //     this.reserForm(myForm);
  //     this.snackBar.open(res.toString(), '', {
  //       duration: 5000,
  //       verticalPosition: 'top'
  //     });
  //   })
  // }

  save() {

  }
}
