import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Models/User';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private service: UserService,
    private actRoute: ActivatedRoute
  ) {}
  lang;
  isUser: boolean;
  user: User;
  isAdmin = false;
  private id: string;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    this.isAdmin = false;
    this.user = this.service.getU();
    if (this.user != null) {
      this.isUser = true;
      this.isAdmin = this.user.is_admin;
    }
    else{
      this.isAdmin = false;
      this.isUser = false;
    }
    this.service.user.subscribe((x) => {
      if (x != null) {
        this.isUser = true;
        this.isAdmin = x.is_admin;
      }   else{
        this.isAdmin = false;
        this.isUser = false;
      }
    });
  }

  changeLang(lang) {
    console.log(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}
