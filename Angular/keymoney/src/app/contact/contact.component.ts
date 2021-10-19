import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '../Models/Email';
import { User } from '../Models/User';
import { ValidationService } from '../Service/validation.service';
import Swal from 'sweetalert2';
import { EmailServiceService } from '../Service/email-service.service';
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: EmailServiceService) {}

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
  
    this.submitted = true;
    // איך מקבל את הפרטים של המשתמש המחובר?
    let emailData = <Email>(this.myForm.value);
    emailData.message = emailData.msg;
    emailData.toemail = emailData.email;
    emailData.subject = 'you can login';
    emailData.toname = emailData.fullName;
    this.service.sendEmail(emailData).subscribe((x) => {
      Swal.fire('הי', 'המייל נשלח בהצלחה', 'success');
      this.myForm.reset();
    });
  }
}
