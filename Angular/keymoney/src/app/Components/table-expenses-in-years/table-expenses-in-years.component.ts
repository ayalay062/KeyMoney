import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { User_expense } from 'src/app/Models/User_expense';
import { EmailServiceService } from 'src/app/Service/email-service.service';
import { UserExOrInDetailsService } from 'src/app/Service/user-ex-or-in-details.service';
import { AddTableExpenseInYearComponent } from '../add-table-expense-in-year/add-table-expense-in-year.component';
import { EditTableExpenseInYearComponent } from '../edit-table-expense-in-year/edit-table-expense-in-year.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'table-expenses-in-years',
  templateUrl: './table-expenses-in-years.component.html',
  styleUrls: ['./table-expenses-in-years.component.css']
})
export class TableExpensesInYearsComponent implements OnInit {

  ListData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options', 'usually_expense', 'date', 'sum'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: UserExOrInDetailsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private emailService: EmailServiceService) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshExpenseList();
    })
  }

  ngOnInit(): void {
    this.refreshExpenseList();
  }

  onEdit(dep: User_expense) {
    this.service.expenseDetails = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    console.log(dep);
    dialogConfig.data = {
      autho_user_id: dep
    }
    this.dialog.open(EditTableExpenseInYearComponent, dialogConfig);
  }

  onDelete(id: number) {
    console.log(id);
    if (confirm('are you sure to delete?')) {
      this.service.deleteExp(id).subscribe(res => {
        this.refreshExpenseList();
        this.snackBar.open(res.toString(), '', {
          duration: 5000, verticalPosition: 'top'
        });
      });
    }
  }
  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddTableExpenseInYearComponent, dialogConfig);
  }

  refreshExpenseList() {
    // var data = [{ password: 111, liscence: 2546, email: "agdhjf@gmail.com" },
    // { password: 222, liscence: 7856, email: "ngddhjf@gmail.com" }];
    // this.ListData = new MatTableDataSource(data);
    this.service.getExpenseList().subscribe(data => {
      this.ListData = new MatTableDataSource(data);
      this.ListData.sort = this.sort;
    })
  }

}
