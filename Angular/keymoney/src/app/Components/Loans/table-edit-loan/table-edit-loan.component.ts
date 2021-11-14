import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Expenses } from '../../../Models/Expenses';
import { Loans } from '../../../Models/Loans';
import { ExpensesService } from '../../../Service/expenses.service';
import { LoansService } from '../../../Service/loans.service';
import { ValidationService } from '../../../Service/validation.service';

@Component({
  selector: 'edit_loan',
  templateUrl: './table-edit-loan.component.html',
  styleUrls: ['./table-edit-loan.component.css'],
})
export class TableEditLoanComponent implements OnInit {
  myForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    public dialogbox: MatDialogRef<TableEditLoanComponent>,
    private service: LoansService,
    private snackBar: MatSnackBar,
    private expService: ExpensesService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log(data);
    this.id = data.id_loan;
  }
  // onSubmit(form: NgForm){
  //   this.service.updateLo(form.value).subscribe(res => {
  //     this.snackBar.open(res.toString(), '', {
  //       duration: 5000,
  //       verticalPosition: "top"
  //     })
  //   })

  allCategory: Expenses[];
  userId: string;

  ngOnInit(): void {
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
    //this.formData = this.service.formData;
    this.service.getLoanById(this.id).subscribe((res) => {
      this.myForm = this.fb.group(res);
      this.myForm.patchValue({
        id_expense: '' + res.id_expense,
        date_ofLoan: '' + new Date(res.date_ofLoan).toISOString().substring(0,10),
      });
    });
  }
  OnClose() {
    this.dialogbox.close();
    this.service.filter('register click');
  }
  save() {
    this.service.updateLo(this.myForm.value).subscribe((res) => {
      Swal.fire('הי', 'הלוואה עודכנה בהצלחה', 'success');
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
