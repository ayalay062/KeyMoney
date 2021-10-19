import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Expenses } from 'src/app/Models/Expenses';
import { User_expense } from 'src/app/Models/User_expense';
import { ExpensesService } from 'src/app/Service/expenses.service';
import { GraphService } from 'src/app/Service/graph.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private graph: GraphService, private actRoute: ActivatedRoute,
     private userExpSer: User_expense,
    private service:ExpensesService) { }
  // peopleInVirus: number;
  allExpenses: Expenses[];

  ngOnInit(): void {
    // this.actRoute.paramMap.subscribe(params => {
    //   const description = params.get('id');
    //   this.userExpSer.getDiseaseByDesc(description).subscribe(virus => {
    //     this.graph.userExpByCategory(virus.id_virus).subscribe(
    //       res => { this.chartDatasets = [{ data: res, label: ' מוצא' }] },
    //     )
    //   }
    //   )
    // });
    // this.service.getExpensesList().subscribe(success => {
    //   this.allExpenses = success;
    //   this.chartLabels = this.allExpenses.map((item:Expenses) => item.name_expense);
    // })
  }

    public chartType: string = 'doughnut';
  
    public chartDatasets: Array<any> = [
      { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
    ];
  
    public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];
  
    public chartColors: Array<any> = [
      {
        backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
        hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
        borderWidth: 2,
      }
    ];
  
    public chartOptions: any = {
      responsive: true
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }



}
