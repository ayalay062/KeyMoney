import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '../Models/Email';
import { User } from '../Models/User';
import { ValidationService } from '../Service/validation.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  myForm: FormGroup;
  submitted = false;
  mail = new Email();
  u: User;
  erroe = {};

  ngOnInit(): void {
    this.myForm = this.fb.group({
      // id_patient: ['', [Validators.required, ValidationService.numbersValidator, Validators.minLength(9),Validators.maxLength(9), ValidationService.idValidator]],
      fullName: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.required],
      msg: ['', Validators.required],
    });
  }
  sendMsg(u) {
    console.log(this.myForm);
    this.submitted = true;
   
    // איך מקבל את הפרטים של המשתמש המחובר?
    let emailData = new Email();
    emailData.message = u.msg;
    emailData.toemail = u.email;
    emailData.subject = 'you can login';
    emailData.toname = u.name_user;

    Swal.fire('הי','המייל נשלח בהצלחה','success');
    this.myForm.reset();
  }
}
