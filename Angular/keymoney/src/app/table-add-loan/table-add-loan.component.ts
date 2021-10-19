import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Expenses } from '../Models/Expenses';
import { Loans } from '../Models/Loans';
import { UserDetails } from '../Models/UserDetails';
import { ExpensesService } from '../Service/expenses.service';
import { LoansService } from '../Service/loans.service';

@Component({
  selector: 'add_loan',
  templateUrl: './table-add-loan.component.html',
  styleUrls: ['./table-add-loan.component.css']
})
export class TableAddLoanComponent implements OnInit {

  myForm: FormGroup;
  allCategory: Expenses[];
  myLoan= new UserDetails(null, null, null, null, null, null, null, null,null);

  constructor(private service: LoansService,private expService:ExpensesService,
    public dialogbox: MatDialogRef<TableAddLoanComponent>) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'sum': new FormControl("", Validators.required),
      'prisa': new FormControl("", Validators.required),
      'ribit': new FormControl("", Validators.required),
      'date_OfLoan': new FormControl("", Validators.required),
      'days_toGetMailAlert': new FormControl("", Validators.required),
      'id_category': new FormControl("", Validators.required),

    });
    this.expService.getExpensesList().subscribe(success => {
      this.allCategory = success;
    })
  }
  OnClose() {
    this.dialogbox.close();
  }
  save() {
    var loan = this.myForm.get('sum');
    // this.myForm.get('prisa'),
    // this.myForm.get('ribit'),
    // this.myForm.get('id_category'),
    // this.myForm.get('days_toGetMailAlert'),
    // this.myForm.get('date_OfLoan');

    var l = new Loans();

    l.sum = loan.value;
    l.ribit = loan.value;
    l.prisa = loan.value;
    l.date_OfLoan = loan.value;
    l.days_toGetMailAlert = loan.value;
    l.id_category = loan.value;


    this.service.addLoans(l).subscribe(
      res => {
        alert("הלוואה נוספה בהצלחה");
      }
    );
    if (this.myForm.valid)
      this.myForm.reset();
  }
}
