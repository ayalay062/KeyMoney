import { Component, OnInit } from '@angular/core';
import { Expenses } from 'src/app/Models/Expenses';
import { User } from 'src/app/Models/User';
import { User_expense } from 'src/app/Models/User_expense';
import { ExpensesService } from 'src/app/Service/expenses.service';
import { GraphService } from 'src/app/Service/graph.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-diagram-category',
  templateUrl: './diagram-category.component.html',
  styleUrls: ['./diagram-category.component.css'],
})
export class DiagramCategoryComponent implements OnInit {
  constructor(private graph: GraphService, private service: ExpensesService) {}
  // peopleInVirus: number;
  allExpenses: Expenses[];
  userId: string;
  ngOnInit(): void {
    this.userId = (<User>JSON.parse(localStorage.getItem('user'))).id_user;
    //שליפת ההוצאות על ידי קטגוריות
    this.graph.userExpByCategory(this.userId).subscribe((res) => {
      this.barChartData[0].data = res;
    });
    //שליפת שמות ההוצאות  -קטגוריות
    this.service.getExpensesList().subscribe((success) => {
      this.allExpenses = success;
      this.barChartLabels = this.allExpenses.map(
        (item: Expenses) => item.name_expense
      );
    });
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  //מבנה עמודות בשם הוצאות
  barChartData: ChartDataSets[] = [
    { data: [], label: 'סך הוצאות ', backgroundColor: 'red' },
  ];
}
