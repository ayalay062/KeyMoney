import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { Expenses } from 'src/app/Models/Expenses';
import { Kinds } from 'src/app/Models/Kinds';
import { User_expense } from 'src/app/Models/User_expense';
import { AmutaService } from 'src/app/Service/amuta.service';
import { UserExOrInDetailsService } from 'src/app/Service/user-ex-or-in-details.service';
import { ValidationService } from 'src/app/Service/validation.service';
import Swal from 'sweetalert2';
import { ExpensesService } from 'src/app/Service/expenses.service';
import { KindsService } from 'src/app/Service/kinds.service';


@Component({
  selector: 'myForm-new-expense',
  templateUrl: './form-new-expense.component.html',
  styleUrls: ['./form-new-expense.component.css']
})
export class FormNewExpenseComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private amutaSer: AmutaService,
    private ExInDetails: UserExOrInDetailsService,
    private kService: KindsService, private expService: ExpensesService) { }
    userId: string;
  todaydate = new Date();
  submitted = false;
  myForm: FormGroup;
  allExpense: Expenses[];
  allKinds: Kinds[];
  expenseDetails: User_expense;

  ngOnInit(): void {
   
    this.expenseDetails = this.ExInDetails.expenseDetails;

    this.myForm = this.fb.group({
      id_expense: ['', Validators.required],
      id_kind: ['', Validators.required],
           sum: ['',   Validators.compose([
          Validators.required,
          ValidationService.numbersValidator,
        ])],
      expense_date: ['', Validators.required],
    })
      
    this.expService.getExpensesList().subscribe((success) => {
      this.allExpense = success;
    });
    this.kService.getKindsList().subscribe((success) => {
      this.allKinds = success;
    });
  }

  save() {
    this.userId = (<User>JSON.parse(localStorage.getItem('user'))).id_user;
    var l = <User_expense>this.myForm.value;
    l.id_user = this.userId;
    // l.sum = loan.value;
    // l.ribit = loan.value;
    // l.prisa = loan.value;
    // l.date_OfLoan = loan.value;
    // l.days_toGetMailAlert = loan.value;
    // l.id_expense = loan.value;

    this.ExInDetails.addExp(l).subscribe((res) => {
      Swal.fire('הי', 'ההוצאה נוספה בהצלחה', 'success');
      //this.router.ne
    });
    if (this.myForm.valid) this.myForm.reset();
  }

}
