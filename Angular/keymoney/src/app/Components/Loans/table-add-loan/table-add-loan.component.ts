import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Expenses } from '../../../Models/Expenses';
import { Loans } from '../../../Models/Loans';
import { User } from '../../../Models/User';
import { UserDetails } from '../../../Models/UserDetails';
import { ExpensesService } from '../../../Service/expenses.service';
import { LoansService } from '../../../Service/loans.service';
import { ValidationService } from '../../../Service/validation.service';

@Component({
  selector: 'add_loan',
  templateUrl: './table-add-loan.component.html',
  styleUrls: ['./table-add-loan.component.css'],
})
export class TableAddLoanComponent implements OnInit {
  myForm: FormGroup;
  allCategory: Expenses[];
  userId: string;
  constructor(
    private service: LoansService,
    private expService: ExpensesService,
    public dialogbox: MatDialogRef<TableAddLoanComponent>
  ) {}

  ngOnInit(): void {
    this.userId = (<User>JSON.parse(localStorage.getItem('user'))).id_user;
    this.myForm = new FormGroup({
      sum: new FormControl('', [
        Validators.required,
        ValidationService.numbersValidator,
      ]),
      prisa: new FormControl('', Validators.required),
      ribit: new FormControl('', Validators.required),
      date_ofLoan: new FormControl(
        '' + new Date().toISOString().substring(0, 10),
        Validators.required
      ),

      id_expense: new FormControl('', Validators.required),
      loan_info: new FormControl('', Validators.required),
    });
    this.expService.getExpensesList().subscribe((success) => {
      this.allCategory = success;
    });
  }
  OnClose() {
    this.dialogbox.close();
  }
  save() {
    var l = <Loans>this.myForm.value;
    l.id_user = this.userId;
    l.days_toGetMailAlert = 0;

    this.service.addLoans(l).subscribe((res) => {
      Swal.fire('הי', 'הלוואה נוספה בהצלחה', 'success');
      this.close();
    });
    if (this.myForm.valid) this.myForm.reset();
  }

  close() {
    if (this.dialogbox && this.dialogbox.close) {
      this.dialogbox.close({ data: 'Order' });
    }
  }
}
