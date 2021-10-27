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
import { ValidationService } from 'src/app/Service/validation.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Amuta_deposits } from 'src/app/Models/Amuta_deposits';
import { AmutaDepositService } from 'src/app/Service/amuta-deposit.service';
import { Amuta } from 'src/app/Models/Amuta';
import { AmutaService } from 'src/app/Service/amuta.service';

@Component({
  selector: 'app-form-new-amuta',
  templateUrl: './form-new-amuta.component.html',
  styleUrls: ['./form-new-amuta.component.css'],
})
export class FormNewAmutaComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private amService: AmutaDepositService,
    private amutaSer: AmutaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogbox: MatDialogRef<FormNewAmutaComponent>
  ) {
    if (!this.data) this.data = [];
  }
  userId: string;
  todaydate = new Date();
  submitted = false;
  myForm: FormGroup;
  amutaDe: Amuta_deposits;
  amutaDefault: Amuta;
  allAmutot: Amuta[] = [];
  user: User;
  ngOnInit(): void {
    if (!this.data) this.data = [];
    this.user = <User>JSON.parse(localStorage.getItem('user'));

    this.amutaSer.getAmutaList().subscribe((x) => {
      this.allAmutot = x;
    });
    this.myForm = this.fb.group({
      sum: [
        '',
        Validators.compose([
          Validators.required,
          ValidationService.numbersValidator,
        ]),
      ],
      id_amuta: ['', Validators.compose([Validators.required])],
      dateOfDeposit: [
        '' + new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
    });

    if (this.data && this.data.id) {
      this.amService.getAmutaDepositById(this.data.id).subscribe((res) => {
        this.amutaDe = res;
    
        this.myForm = this.fb.group(res);
        this.myForm.patchValue({
          id_amuta: '' + res.id_amuta,
          dateOfDeposit:
            '' + new Date(res.dateOfDeposit).toISOString().substring(0, 10),
        });
      });
    } else if (this.user.id_amuta) {
      this.myForm.patchValue({
        id_amuta: '' + this.user.id_amuta,
      });
    }
    this.amutaDefault =  this.user.Amuta;
  }
  OnClose() {
    this.dialogbox.close();
  }

  id_deposit: number;
  id_amuta: number;
  id_user: string;
  sum: number;
  dateOfDeposit: Date;

  save() {
    var userId = this.user.id_user;
    var amuta = this.user.id_amuta;
    var l = <Amuta_deposits>this.myForm.value;
    l.id_user = userId;
   // l.id_amuta = amuta;

    if (!l.id_deposit || l.id_deposit === 0) {
      this.amService.addAmuta_deposits(l).subscribe((res) => {
        Swal.fire('הי', 'ההעברה נוספה בהצלחה', 'success');
        this.OnClose();
      });
    } else {
      this.amService.updateAmuta_deposits(l).subscribe((res) => {
        Swal.fire('הי', 'ההעברה עודכנה בהצלחה', 'success');
        this.OnClose();
      });
    }

    if (this.myForm.valid) this.myForm.reset();
  }
}
