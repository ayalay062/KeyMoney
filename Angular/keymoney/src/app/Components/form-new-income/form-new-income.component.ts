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
import { Income } from 'src/app/Models/Income';
import { Kinds } from 'src/app/Models/Kinds';
import { User_income } from 'src/app/Models/User_income';
import { AmutaService } from 'src/app/Service/amuta.service';
import { UserExOrInDetailsService } from 'src/app/Service/user-ex-or-in-details.service';
import { ValidationService } from 'src/app/Service/validation.service';
import Swal from 'sweetalert2';
import { IncomeService } from 'src/app/Service/income.service';
import { KindsService } from 'src/app/Service/kinds.service';
import { UserUser_incomeService } from 'src/app/Service/user-income.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'form-new-income',
  templateUrl: './form-new-income.component.html',
  styleUrls: ['./form-new-income.component.css'],
})
export class FormNewIncomeComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userIncService: UserUser_incomeService,
    private kService: KindsService,
    private expService: IncomeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogbox: MatDialogRef<FormNewIncomeComponent>
  ) {   if (!this.data) this.data = [];}
  userId: string;
  todaydate = new Date();
  submitted = false;
  myForm: FormGroup;
  allIncome: Income[];
  allKinds: Kinds[];
  incomeDetails: User_income;

  ngOnInit(): void {
    if (!this.data) this.data = [];

    this.myForm = this.fb.group({
      id_income: ['', Validators.required],
      // id_kind: ['', Validators.required],
      sum: [
        '',
        Validators.compose([
          Validators.required,
          ValidationService.numbersValidator,
        ]),
      ],   income_info:[
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ]),
      ],
      income_date: [
        '' + new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
    });
    if (this.data && this.data.id) {
      this.userIncService.getById(this.data.id).subscribe((res) => {
        this.myForm = this.fb.group(res);
        this.myForm.patchValue({
          id_kind: '' + res.id_kind,
          income_date:
            '' + new Date(res.income_date).toISOString().substring(0, 10),
        });
      });
    }
    this.expService.getIncomeList().subscribe((success) => {
      this.allIncome = success;
    });
    // this.kService.getKindsList().subscribe((success) => {
    //   this.allKinds = success;
    // });
  }
  OnClose() {
    this.dialogbox.close();
  }
  save() {
    this.userId = (<User>JSON.parse(localStorage.getItem('user'))).id_user;
    var l = <User_income>this.myForm.value;
    l.id_user = this.userId;
    l.id_kind = 1;
    if (!l.id || l.id === 0) {
      this.userIncService.addUser_income(l).subscribe((res) => {
        Swal.fire('הי', 'ההכנסה נוספה בהצלחה', 'success');
        if (this.data.isClose) {
          this.OnClose();
        } else {
          this.router.navigateByUrl('table-expenses-in-years');
        }
      });
    } else {
      this.userIncService.updateUser_income(l).subscribe((res) => {
        Swal.fire('הי', 'העדכון בוצע בהצלחה', 'success');
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
