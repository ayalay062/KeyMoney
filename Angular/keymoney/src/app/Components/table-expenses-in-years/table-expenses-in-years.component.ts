import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { User_expense } from 'src/app/Models/User_expense';
import { User_income } from 'src/app/Models/user_income';
import { EmailServiceService } from 'src/app/Service/email-service.service';
import { UserExOrInDetailsService } from 'src/app/Service/user-ex-or-in-details.service';
import { AddTableExpenseInYearComponent } from '../add-table-expense-in-year/add-table-expense-in-year.component';
import { EditTableExpenseInYearComponent } from '../edit-table-expense-in-year/edit-table-expense-in-year.component';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Models/User';
import Swal from 'sweetalert2';
import { UserUser_incomeService } from 'src/app/Service/user-income.service';
import { UserService } from 'src/app/Service/user.service';
import { FormNewExpenseComponent } from '../form-new-expense/form-new-expense.component';
import { FormNewIncomeComponent } from '../form-new-income/form-new-income.component';

@Component({
  selector: 'table-expenses-in-years',
  templateUrl: './table-expenses-in-years.component.html',
  styleUrls: ['./table-expenses-in-years.component.css'],
})
export class TableExpensesInYearsComponent implements OnInit {
  ListData: MatTableDataSource<User_expense>;
  ListData2: MatTableDataSource<User_expense>;

  ListDataIncome: MatTableDataSource<User_income>;
  displayedColumns: string[] = ['Options', 'expense_date', 'sum'];
  displayedColumnsIncome: string[] = ['Options', 'income_date', 'sum'];
  @ViewChild(MatSort) sort: MatSort;
  calculateSumVal = 0;
  years: number[] = [];
  month: string[] = [
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
  userId: string;
  selectedYear = new Date().getUTCFullYear();
  selectedMonth = this.month[new Date().getMonth()];
  constructor(
    private service: UserExOrInDetailsService,
    private inService: UserUser_incomeService,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshExpenseList(this.selectedYear, this.selectedMonth);
      this.refreshIncomeList(this.selectedYear, this.selectedMonth);
      this.calculateSum(this.selectedYear, this.selectedMonth);
    });
  }

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
    this.refreshExpenseList(this.selectedYear, this.selectedMonth);
    this.refreshIncomeList(this.selectedYear, this.selectedMonth);
    this.calculateSum(this.selectedYear, this.selectedMonth);
  }

  onEdit(dep: number, isExpense: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    console.log(dep);
    dialogConfig.data = {
      id: dep,
      isClose: true
    };
    if (isExpense) {
      const dialogRef = this.dialog.open(FormNewExpenseComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.refreshExpenseList(this.selectedYear, this.selectedMonth);
        this.calculateSum(this.selectedYear, this.selectedMonth);
      });
    } else {
      const dialogRef = this.dialog.open(FormNewIncomeComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.refreshIncomeList(this.selectedYear, this.selectedMonth);
        this.calculateSum(this.selectedYear, this.selectedMonth);
      });
    }
  }
 
  onDelete(id: number, isExpense: boolean) {
    var self = this;
    if (isExpense) {
      Swal.fire({
        title: 'מחיקת הוצאה',
        text: 'האם את/ה בטוח/ה שאת/ה רוצה למחוק את הוצאה?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'מחק',
        cancelButtonText: 'ביטול',
      }).then(function (result) {
        if (result.value) {
          self.service.deleteExp(id).subscribe((res) => {
            self.refreshExpenseList(self.selectedYear, self.selectedMonth);
            self.calculateSum(self.selectedYear, self.selectedMonth);
            Swal.fire('הי', 'המחיקה בוצעה בהצלחה', 'success');
          });
        }
      });
    } else {
      Swal.fire({
        title: 'מחיקת הכנסה',
        text: 'האם את/ה בטוח/ה שאת/ה רוצה למחוק את הכנסה?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'מחק',
        cancelButtonText: 'ביטול',
      }).then(function (result) {
        if (result.value) {
          self.inService.deleteUserIncome(id).subscribe((res) => {
            self.refreshIncomeList(self.selectedYear, self.selectedMonth);
            self.calculateSum(self.selectedYear, self.selectedMonth);
            Swal.fire('הי', 'המחיקה בוצעה בהצלחה', 'success');
          });
        }
      });
    }
  }
  onAdd(isExpense: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = {
      isClose: true
    };
    if (isExpense) {
      const dialogRef = this.dialog.open(FormNewExpenseComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.refreshExpenseList(this.selectedYear, this.selectedMonth);
        this.calculateSum(this.selectedYear, this.selectedMonth);
      });
    } else {
      const dialogRef = this.dialog.open(FormNewIncomeComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.refreshIncomeList(this.selectedYear, this.selectedMonth);
        this.calculateSum(this.selectedYear, this.selectedMonth);
      });
    }
  }
  changeYearMonth(year, month) {
    this.selectedYear = year;
    this.selectedMonth = month;
    this.refreshExpenseList(year, month);
    this.refreshIncomeList(year, month);
    this.calculateSum(this.selectedYear, this.selectedMonth);
  }
  refreshExpenseList(year, month) {
    var m = 0;
    for (let index = 0; index < this.month.length; index++) {
      m = index;
      if (this.month[index] === month) break;
    }
    this.service.getExpenseList(year, ++m, this.userId).subscribe((data) => {
      var lData1 = data.filter((x) => x.id_kind === 1);
      this.ListData = new MatTableDataSource(lData1);
      this.ListData.sort = this.sort;
      var lData2 = data.filter((x) => x.id_kind === 2);
      this.ListData2 = new MatTableDataSource(lData2);
      this.ListData2.sort = this.sort;
    });
  }
  refreshIncomeList(year, month) {
    var m = 0;
    for (let index = 0; index < this.month.length; index++) {
      m = index;
      if (this.month[index] === month) break;
    }
    this.inService
      .getUser_incomeList(year, ++m, this.userId)
      .subscribe((data) => {
        this.ListDataIncome = new MatTableDataSource(data);
        this.ListDataIncome.sort = this.sort;
      });
  }

  calculateSum(year, month) {
    var m = 0;
    for (let index = 0; index < this.month.length; index++) {
      m = index;
      if (this.month[index] === month) break;
    }
    this.userService.calculateSum(year, ++m, this.userId).subscribe((data) => {
      this.calculateSumVal = data;
    });
  }
}
