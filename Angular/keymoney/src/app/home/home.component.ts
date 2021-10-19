import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/User';
import { UserService } from '../Service/user.service';

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
  userLogin = false;
  lang;
  isUser: boolean;
  private id: string;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';

    var user = this.service.getU();
    if (user == null) this.isUser = true;
  }

  changeLang(lang) {
    console.log(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}
