import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from '../Models/Email';
import { User } from '../Models/User';
import { EmailServiceService } from '../Service/email-service.service';
import { UserService } from '../Service/user.service';
import { ModalContainerComponent } from 'angular-bootstrap-md';
import { UserDetails } from '../Models/UserDetails';
import { BehaviorSubject } from 'rxjs';
import { ValidationService } from '../Service/validation.service';
import { Amuta } from '../Models/Amuta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  lang;
  isUser: boolean;
  private id: string;

  new_user: User;
  validatingForm: FormGroup;
  myUser = new UserDetails(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
 
  error: any = null;
  success: boolean = false;
  user = new BehaviorSubject<User>(null);
  // ???
  //והוא לא היה קיים כאן, צריך לאתחל אותו בנתונים (לכאורה לשלוף מהסרבר) HTML כי משתמשים בו ב allAmutot הוספתי את המשתנה
  allAmutot: Amuta[] = [];

  @ViewChild('frame', { static: true }) frame: ModalContainerComponent;

  @ViewChild('frame2', { static: true }) frame2: ModalContainerComponent;

  @ViewChild('frame3', { static: true }) frame3: ModalContainerComponent;
  constructor(
    private userSer: UserService,
    private emailSer: EmailServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {}
 
  ngOnInit(): void {
    var user = this.userSer.getU();
    if (user != null) this.isUser = true;
    this.userSer.user.subscribe((x) => {
      user = this.userSer.getU();
      if (user != null) this.isUser = true;
    });
    this.lang = localStorage.getItem('lang') || 'en';

    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          ValidationService.emailValidator,
        ])
      ),
      loginFormModalPassword: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(9)])
      ),
      // loginFormModalId: new FormControl(
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     ValidationService.numbersValidator,
      //   ])
      // ),
      loginFormModalName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      loginFormModalTel: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          ValidationService.numbersValidator,
        ])
      ),
      loginFormModalMisgeret: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });

    this.resetForm();
  }

  resetValidForm(){
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          ValidationService.emailValidator,
        ])
      ),

      loginFormModalName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
 
    });
  }
  changeLang(lang) {
    console.log(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.reset();
    this.new_user = {
      name_user: '',
      tel: '',
      id_user: null,
      misgeret: null,
      email: '',
    };
  }

  //כניסה
  login() {
    var email = this.validatingForm.get('loginFormModalEmail');
    var pass = this.validatingForm.get('loginFormModalPassword');
    this.userSer.login(email.value, pass.value).subscribe(
      (data) => {
        Swal.fire('הי', 'התחברת בהצלחה', 'success');

        this.userSer.setU(data);
        this.frame.hide();
        // this.router.navigateByUrl('/user-account');
      },
      (err) => {
        Swal.fire('Ooops', 'מייל או סיסמה לא נכונים', 'error');
      }
    );
  }

  sign() {
    let newUser = new User();
    newUser.name_user = this.validatingForm.get('loginFormModalName').value;
    newUser.id_user = this.validatingForm.get('loginFormModalPassword').value;
    newUser.email = this.validatingForm.get('loginFormModalEmail').value;
    newUser.tel = this.validatingForm.get('loginFormModalTel').value;
    newUser.misgeret = this.validatingForm.get('loginFormModalMisgeret').value;
    this.userSer.addUser(newUser).subscribe(
      (success) => {
        this.userSer.setU(success);

        Swal.fire('הי', 'נרשמת בהצלחה', 'success');
        this.frame3.hide();
      },
      (err) => {
        Swal.fire('Ooops', 'משתמש קיים במערכת', 'error');
      }
    );
  }

  onSignOut() {
    this.userSer.signOut();
  }

  onForgetSubmit() {
    let emailData = new Email();
    emailData.message = 'הסיסמא שלך לאתר היא ';
    emailData.toemail = this.validatingForm.get('loginFormModalEmail').value;
    emailData.subject = ' הסיסמא שלך לאתר ';
    emailData.toname = ' הי ' +  this.validatingForm.get('loginFormModalName').value;
    emailData.isResetPassword = true;
    this.emailSer.sendEmail(emailData).subscribe(
      (x) => {
        Swal.fire('הי', 'המייל נשלח בהצלחה', 'success');
        this.validatingForm.reset();
        this.frame2.hide();
      },
      (err) => {
        Swal.fire('Oooops', 'שליחת המייל נכשלה, פנה למנהל המערכת', 'error');
     
        console.log(err);
        this.error = err;
      }
    );

 
  }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }
  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }
  get loginFormModalName() {
    return this.validatingForm.get('loginFormModalName');
  }

  get loginFormModalMisgeret() {
    return this.validatingForm.get('loginFormModalMisgeret');
  }
  get loginFormModalTel() {
    return this.validatingForm.get('loginFormModalTel');
  }
}
