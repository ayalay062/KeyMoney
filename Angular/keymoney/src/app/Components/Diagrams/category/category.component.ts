import { Component, OnInit } from '@angular/core';
import { Expenses } from 'src/app/Models/Expenses';
import { User } from 'src/app/Models/User';
import { User_expense } from 'src/app/Models/User_expense';
import { ExpensesService } from 'src/app/Service/expenses.service';
// import { GraphService } from 'src/app/Service/graph.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(
    // private graph: GraphService,
    private userExpSer: User_expense,
    private service: ExpensesService
  ) {}
  // peopleInVirus: number;
  allExpenses: Expenses[];
  userId: string;
  ngOnInit(): void {
    this.userId = (<User>JSON.parse(localStorage.getItem('user'))).id_user;

  //   this.graph.userExpByCategory(this.userId).subscribe((res) => {
  //     this.barChartData[0].data = res;
  //     // res.forEach((resData) => {

  //     //   this.barChartData[0].data.push(resData.value);
  //     // });

  //  //   this.chartDatasets = [{ data: res, label: 'מספר הוצאות' }];
  //   });

    // this.service.getExpensesList().subscribe((success) => {
    //   this.allExpenses = success;
    //   this.barChartLabels = this.allExpenses.map(
    //     (item: Expenses) => item.name_expense
    //   );

    //   // this.chartLabels = this.allExpenses.map(
    //   //   (item: Expenses) => item.name_expense
    //   //    );
    // });
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'הקטגוריות ', backgroundColor: 'red' },
  ];

  // public chartType: string = 'doughnut';

  // public chartDatasets: Array<any> = [
  //   { data: [300, 50, 100, 40, 120], label: 'My First dataset' },
  // ];

  // public chartLabels: Array<any> = [
  //   'Red',
  //   'Green',
  //   'Yellow',
  //   'Grey',
  //   'Dark Grey',
  // ];

  // public chartColors: Array<any> = [
  //   {
  //     backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
  //     hoverBackgroundColor: [
  //       '#FF5A5E',
  //       '#5AD3D1',
  //       '#FFC870',
  //       '#A8B3C5',
  //       '#616774',
  //     ],
  //     borderWidth: 2,
  //   },
  // ];

  // public chartOptions: any = {
  //   responsive: true,
  // };
  // public chartClicked(e: any): void {}
  // public chartHovered(e: any): void {}
}
