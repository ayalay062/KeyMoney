import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Loans } from '../Models/Loans';
import { LoansService } from '../Service/loans.service';

@Component({
  selector: 'edit_loan',
  templateUrl: './table-edit-loan.component.html',
  styleUrls: ['./table-edit-loan.component.css']
})
export class TableEditLoanComponent implements OnInit {

  formData: Loans;
  myForm: FormGroup;
  id: number;

  constructor(public dialogbox: MatDialogRef<TableEditLoanComponent>,
    private service: LoansService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data) {
    console.log(data)
    this.id = data.id_loan;
  }

ngOnInit(): void {
  this.formData = this.service.formData;
  this.service.getLoanById(this.id).subscribe(
    res => {
      this.formData = res;
    }
  )
}
onClose(){
  this.dialogbox.close();
  this.service.filter('register click');
}
onSubmit(form: NgForm){
  this.service.updateLo(form.value).subscribe(res => {
    this.snackBar.open(res.toString(), '', {
      duration: 5000,
      verticalPosition: "top"
    })
  })
}

}
