import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'daily-expense',
  templateUrl: './daily-expense.component.html',
  styleUrls: ['./daily-expense.component.css']
})
export class DailyExpenseComponent implements OnInit {

  todaydate = new Date();
  months=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
  years=[];//לעבור על השנים שבהן היתה פעילות ולבדוק min ו max

  constructor(private router: Router,private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
