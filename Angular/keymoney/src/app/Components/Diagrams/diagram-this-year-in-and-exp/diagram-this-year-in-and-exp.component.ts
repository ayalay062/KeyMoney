import { Component, OnInit, ViewChild } from '@angular/core';
import { Expenses } from 'src/app/Models/Expenses';
import { User } from 'src/app/Models/User';
import { User_expense } from 'src/app/Models/User_expense';
import { ExpensesService } from 'src/app/Service/expenses.service';
import { GraphService } from 'src/app/Service/graph.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'diagram-this-year-in-and-exp',
  templateUrl: './diagram-this-year-in-and-exp.component.html',
  styleUrls: ['./diagram-this-year-in-and-exp.component.css'],
})
export class DiagramThisYearInAndExpComponent implements OnInit {
  constructor(private graph: GraphService, private service: ExpensesService) {}
  // peopleInVirus: number;
  allExpenses: Expenses[];
  years: number[] = [];
  userId: string;
  selectedYear = new Date().getUTCFullYear();
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  ngOnInit(): void {
    this.userId = (<User>JSON.parse(localStorage.getItem('user'))).id_user;
    var i = 0;
    for (
      let index = this.selectedYear - 9;
      index <= this.selectedYear;
      index++
    ) {
      this.years[i++] = index;
    }
    this.showGraph(this.selectedYear);
  }

  showGraph(year: number) {
    this.selectedYear = year;

    this.graph.GetMonthsByYear(this.userId, year).subscribe((res) => {
      this.chart.chart.data.datasets[0].data=[];
      this.chart.chart.data.datasets[1].data=[];
      this.chart.chart.data.datasets[2].data=[];
      this.chart.chart.data.datasets[3].data=[];
      res.forEach((resData) => {
        if (resData) {
          var d = resData.split(',');
          this.chart.chart.data.datasets[0].data.push(+d[0]);
          this.chart.chart.data.datasets[1].data.push(+d[1]);
          this.chart.chart.data.datasets[2].data.push(+d[2]);
          this.chart.chart.data.datasets[3].data.push(+d[3]);
        //  this.barChartData[0].data.push(+d[0]);
        //  this.barChartData[1].data.push(+d[1]);
        }
      });
     // this.chart.chart.data.datasets[0].data = [55, 355, 35, 50, 50, 60, 10]
    //  this.chart.chart.update()
      this.chart.chart.update()
    });
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'סך הוצאות', backgroundColor: 'red' },
    { data: [], label: 'סך השקעות', backgroundColor: 'yellow' },
    { data: [], label: 'סך הלוואות', backgroundColor: 'green' },
    { data: [], label: 'סך הכנסות', backgroundColor: 'blue' },
  ];
}
