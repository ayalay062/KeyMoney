import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserExOrInDetailsService } from 'src/app/Service/user-ex-or-in-details.service';

@Component({
  selector: 'app-edit-table-expense-in-year',
  templateUrl: './edit-table-expense-in-year.component.html',
  styleUrls: ['./edit-table-expense-in-year.component.css']
})
export class EditTableExpenseInYearComponent implements OnInit {


  // formData: Expenses_or_Income;
  myForm: FormGroup;
  id: number;
  constructor(public dialogbox: MatDialogRef<EditTableExpenseInYearComponent>,
    private userDetService: UserExOrInDetailsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data) {
    console.log(data)
    this.id = data.autho_user_id;
  }

  ngOnInit(): void {
    // this.formData = this.userDetService.expenseDetails;

    // this.userDetService.getAuthoById(this.id).subscribe(
    //   res => {
    //     this.formData = res;
    //   }
    // )
  }
  onClose() {
    this.dialogbox.close();
    this.userDetService.filter('register click');
  }
  onSubmit(form: NgForm) {
    this.userDetService.updateExp(form.value).subscribe(res => {
      this.snackBar.open(res.toString(), '', {
        duration: 5000,
        verticalPosition: "top"
      });
      this.dialogbox.close();
    })
  }
}
