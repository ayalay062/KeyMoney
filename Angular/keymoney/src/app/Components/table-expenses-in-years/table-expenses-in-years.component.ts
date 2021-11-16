import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { User_expense } from 'src/app/Models/User_expense';
import { User_income } from 'src/app/Models/user_income';
import { EmailServiceService } from 'src/app/Service/email-service.service';
import { UserExOrInDetailsService } from 'src/app/Service/user-ex-or-in-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Models/User';
import Swal from 'sweetalert2';
import { UserUser_incomeService } from 'src/app/Service/user-income.service';
import { UserService } from 'src/app/Service/user.service';
import { FormNewExpenseComponent } from '../form-new-expense/form-new-expense.component';
import { FormNewIncomeComponent } from '../form-new-income/form-new-income.component';
import { LoansService } from 'src/app/Service/loans.service';
import { Loans } from 'src/app/Models/Loans';
import { TableEditLoanComponent } from '../Loans/table-edit-loan/table-edit-loan.component';
import { FormNewAmutaComponent } from '../form-new-amuta/form-new-amuta.component';
import { AmutaDepositService } from 'src/app/Service/amuta-deposit.service';
import { Amuta_deposits } from 'src/app/Models/Amuta_deposits';

import { Workbook, Worksheet } from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
@Component({
  selector: 'table-expenses-in-years',
  templateUrl: './table-expenses-in-years.component.html',
  styleUrls: ['./table-expenses-in-years.component.css'],
})
export class TableExpensesInYearsComponent implements OnInit {
  ListData: MatTableDataSource<User_expense>;
  lData: User_expense[];
  ListData2: MatTableDataSource<User_expense>;
  lData2: User_expense[];
  ListDataLoans: MatTableDataSource<Loans>;
  lDataLoans: Loans[];
  ListDataAmuta: MatTableDataSource<Amuta_deposits>;
  lDataAmutaD: Amuta_deposits[];
  ListDataIncome: MatTableDataSource<User_income>;
  lDataIncome: User_income[];
  displayedColumns: string[] = [
    'Options',
    'expense_date',
    'expense_info',
    'sum',
  ];
  amutaColumns: string[] = ['Options', 'dateOfDeposit', 'id_amuta', 'sum'];
  displayedColumnsLoans: string[] = ['Options', 'loan_info', 'sum_month'];
  displayedColumnsIncome: string[] = [
    'Options',
    'income_date',
    'income_info',
    'sum',
  ];
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
  userMisgeret: number;
  allExpensesValue: number;
  selectedYear = new Date().getUTCFullYear();
  selectedMonth = this.month[new Date().getMonth()];
  constructor(
    private service: UserExOrInDetailsService,
    private inService: UserUser_incomeService,
    private dialog: MatDialog,
    private userService: UserService,
    private loanService: LoansService,
    private amutaService: AmutaDepositService
  ) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshExpenseList(this.selectedYear, this.selectedMonth);
      this.refreshIncomeList(this.selectedYear, this.selectedMonth);
      this.calculateSum(this.selectedYear, this.selectedMonth);
      this.refreshLoansList(this.selectedYear, this.selectedMonth);
      this.refreshAmutaList(this.selectedYear, this.selectedMonth);
    });
  }

  ngOnInit(): void {
    var user = <User>JSON.parse(localStorage.getItem('user'));
    this.userId = user.id_user;
    this.userMisgeret = user.misgeret;
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
    this.refreshLoansList(this.selectedYear, this.selectedMonth);
    this.refreshAmutaList(this.selectedYear, this.selectedMonth);
  }

  onEdit(dep: number, isExpense: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    console.log(dep);
    dialogConfig.data = {
      id: dep,
      isClose: true,
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

  onEditLoan(dep: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    console.log(dep);
    dialogConfig.data = {
      id_loan: dep,
    };
    const dialogRef = this.dialog.open(TableEditLoanComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.refreshLoansList(this.selectedYear, this.selectedMonth);
      this.calculateSum(this.selectedYear, this.selectedMonth);
    });
  }
  onDeleteLoan(id: string) {
    var self = this;

    Swal.fire({
      title: 'מחיקת הלואה',
      text: 'האם את/ה בטוח/ה שאת/ה רוצה למחוק את ההלואה?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'מחק',
      cancelButtonText: 'ביטול',
    }).then(function (result) {
      if (result.value) {
        self.loanService.deleteLo(id).subscribe((res) => {
          self.refreshLoansList(self.selectedYear, self.selectedMonth);
          self.calculateSum(self.selectedYear, self.selectedMonth);
          Swal.fire('הי', 'המחיקה בוצעה בהצלחה', 'success');
        });
      }
    });
  }
  onDeleteAmuta(id: number) {
    var self = this;

    Swal.fire({
      title: 'מחיקת השקעה בעמותה',
      text: 'האם את/ה בטוח/ה שאת/ה רוצה למחוק את השקעה בעמותה?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'מחק',
      cancelButtonText: 'ביטול',
    }).then(function (result) {
      if (result.value) {
        self.amutaService.deleteAmutaDep(id).subscribe((res) => {
          self.refreshAmutaList(self.selectedYear, self.selectedMonth);
          self.calculateSum(self.selectedYear, self.selectedMonth);
          Swal.fire('הי', 'המחיקה בוצעה בהצלחה', 'success');
        });
      }
    });
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
      isClose: true,
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
    this.refreshLoansList(this.selectedYear, this.selectedMonth);
    this.refreshAmutaList(this.selectedYear, this.selectedMonth);
  }
  onEditAmuta(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = {
      id: id,
    };
    const dialogRef = this.dialog.open(FormNewAmutaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.refreshAmutaList(this.selectedYear, this.selectedMonth);
      this.calculateSum(this.selectedYear, this.selectedMonth);
    });
  }
  addToAmuta() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';

    const dialogRef = this.dialog.open(FormNewAmutaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.refreshAmutaList(this.selectedYear, this.selectedMonth);
      this.calculateSum(this.selectedYear, this.selectedMonth);
    });
  }
  refreshExpenseList(year, month) {
    var m = 0;
    for (let index = 0; index < this.month.length; index++) {
      m = index;
      if (this.month[index] === month) break;
    }
    this.service.getExpenseList(year, ++m, this.userId).subscribe((data) => {
      this.lData = data.filter((x) => x.id_kind === 1);
      this.ListData = new MatTableDataSource(this.lData);
      this.ListData.sort = this.sort;
      this.lData2 = data.filter((x) => x.id_kind === 2);
      this.ListData2 = new MatTableDataSource(this.lData2);
      this.ListData2.sort = this.sort;

      this.allExpensesValue = data.reduce((acc, cur) => acc + cur.sum, 0);
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
        this.lDataIncome = data;
        this.ListDataIncome = new MatTableDataSource(data);
        this.ListDataIncome.sort = this.sort;
      });
  }
  refreshLoansList(year, month) {
    var m = 0;
    for (let index = 0; index < this.month.length; index++) {
      m = index;
      if (this.month[index] === month) break;
    }
    this.loanService
      .calcLoansByUserIdMonthYear(this.userId, ++m, year)
      .subscribe((data) => {
        this.lDataLoans = data;

        this.ListDataLoans = new MatTableDataSource(data);
        this.ListDataLoans.sort = this.sort;
      });
  }
  refreshAmutaList(year, month) {
    var m = 0;
    for (let index = 0; index < this.month.length; index++) {
      m = index;
      if (this.month[index] === month) break;
    }
    this.amutaService
      .getAmutaDepByUserIdMonthYear(this.userId, year, ++m)
      .subscribe((data) => {
        this.lDataAmutaD = data;

        this.ListDataAmuta = new MatTableDataSource(data);
        this.ListDataAmuta.sort = this.sort;
      });
  }

  //הורדת קובץ דוח
  downloadExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      this.selectedMonth + '-' + this.selectedYear + ''
    );

    worksheet = worksheetAddTitleRow(worksheet, '  הוצאות קבועות ');
    worksheet = worksheetAddHeaderRow(worksheet, ['פרטים', 'תאריך', 'סכום']);

    //שליפת ומילוי ההוצאות הקבועות
    for (let element of this.lData) {
      let temp = [];
      temp.push(element.expense_info);
      temp.push(
        new Date(element.expense_date)
          .toISOString()
          .substring(0, 16)
          .replace('T', ' ')
      );
      temp.push(element.sum);
      worksheet.addRow(temp);
    }

    worksheet = worksheetAddTitleRow(worksheet, '  הוצאות משתנות ');
    worksheet = worksheetAddHeaderRow(worksheet, ['פרטים', 'תאריך', 'סכום']);
    //שליפת ומילוי ההוצאות המשתנות
    for (let element of this.lData2) {
      let temp = [];
      temp.push(element.expense_info);
      temp.push(
        new Date(element.expense_date)
          .toISOString()
          .substring(0, 16)
          .replace('T', ' ')
      );
      temp.push(element.sum);
      worksheet.addRow(temp);
    }
    //שליפת ומילוי ההלוואות
    worksheet = worksheetAddTitleRow(worksheet, '   הלוואות ');
    worksheet = worksheetAddHeaderRow(worksheet, ['פרטים', 'סכום']);
    for (let element of this.lDataLoans) {
      let temp = [];
      temp.push(element.loan_info);
      temp.push(element.sum_month);
      worksheet.addRow(temp);
    }
    //שליפת ומילוי עמותות להשקעה
    worksheet = worksheetAddTitleRow(worksheet, '   עמותות להשקעה ');
    worksheet = worksheetAddHeaderRow(worksheet, ['פרטים', 'תאריך', 'סכום']);
    for (let element of this.lDataAmutaD) {
      let temp = [];
      temp.push(element.Amuta ? element.Amuta.name_amuta : '');
      temp.push(
        new Date(element.dateOfDeposit)
          .toISOString()
          .substring(0, 16)
          .replace('T', ' ')
      );
      temp.push(element.sum);
      worksheet.addRow(temp);
    }
    //שליפת ומילוי ההכנסות
    worksheet = worksheetAddTitleRow(worksheet, '   הכנסות ');
    worksheet = worksheetAddHeaderRow(worksheet, ['פרטים', 'תאריך', 'סכום']);
    for (let element of this.lDataIncome) {
      let temp = [];
      temp.push(element.income_info);
      temp.push(
        new Date(element.income_date)
          .toISOString()
          .substring(0, 16)
          .replace('T', ' ')
      );
      temp.push(element.sum);
      worksheet.addRow(temp);
    }
    //חישוב סך היתרה
    let titleRow = worksheet.addRow(['']);
    worksheet = worksheetAddTitleRow(
      worksheet,
      ' סך היתרה ' + this.calculateSumVal + ' שח'
    );

    //שם הקובץ להורדה
    let fname = 'KeyMoney-' + this.selectedYear;

    //הורדת קובץ XLSX
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
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
function worksheetAddTitleRow(worksheet: Worksheet, header: string): Worksheet {
  // Add new row
  let titleRow = worksheet.addRow([header]);
  // Set font, size and style in title row.
  titleRow.font = {
    name: 'Comic Sans MS',
    family: 4,
    size: 14,
    underline: 'none',
    bold: true,
  };
  return worksheet;
}

function worksheetAddHeaderRow(
  worksheet: Worksheet,
  header: string[]
): Worksheet {
  let headerRow = worksheet.addRow(header);
  // Cell Style : Fill and Border
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'CCCCCCCC' },
      bgColor: { argb: 'CCCCCCCC' },
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });
  return worksheet;
}
