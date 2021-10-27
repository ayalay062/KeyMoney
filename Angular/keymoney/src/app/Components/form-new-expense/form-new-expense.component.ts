import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'myForm-new-expense',
  templateUrl: './form-new-expense.component.html',
  styleUrls: ['./form-new-expense.component.css'],
})
export class FormNewExpenseComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private amutaSer: AmutaService,
    private ExInDetails: UserExOrInDetailsService,
    private kService: KindsService,
    private expService: ExpensesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogbox: MatDialogRef<FormNewExpenseComponent>
  ) {
    if (!this.data) this.data = [];
  }
  userId: string;
  todaydate = new Date();
  submitted = false;
  myForm: FormGroup;
  allExpense: Expenses[];
  allKinds: Kinds[];
  expenseDetails: User_expense;

  ngOnInit(): void {
    if (!this.data) this.data = [];
    this.myForm = this.fb.group({
      id_expense: ['', Validators.required],
      id_kind: ['', Validators.required],
      sum: [
        '',
        Validators.compose([
          Validators.required,
          ValidationService.numbersValidator,
        ]),
      ],

      expense_info:[
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ]),
      ],

      expense_date: [
        '' + new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
    });
    if (this.data && this.data.id) {
      this.ExInDetails.getById(this.data.id).subscribe((res) => {
        this.myForm = this.fb.group(res);
        this.myForm.patchValue({
          id_kind: '' + res.id_kind,
          expense_date:
            '' + new Date(res.expense_date).toISOString().substring(0, 10),
        });
      });
    }

    this.expenseDetails = this.ExInDetails.expenseDetails;

    this.expService.getExpensesList().subscribe((success) => {
      this.allExpense = success;
    });
    this.kService.getKindsList().subscribe((success) => {
      this.allKinds = success;
    });
  }
  OnClose() {
    this.dialogbox.close();
  }
  save() {
    this.userId = (<User>JSON.parse(localStorage.getItem('user'))).id_user;
    var l = <User_expense>this.myForm.value;
    l.id_user = this.userId;
    if (!l.id || l.id === 0) {
      this.ExInDetails.addExp(l).subscribe((res) => {
        Swal.fire('הי', 'ההוצאה נוספה בהצלחה', 'success');
        if (this.data.isClose) {
          this.OnClose();
        } else {
          this.router.navigateByUrl('table-expenses-in-years');
        }
      });
    } else {
      this.ExInDetails.updateExp(l).subscribe((res) => {
        Swal.fire('הי', 'ההוצאה עודכנה בהצלחה', 'success');
        if (this.data.isClose) {
          this.OnClose();
        } else {
          this.router.navigateByUrl('table-expenses-in-years');
        }
      });
    }

    if (this.myForm.valid) this.myForm.reset();
  }
}
