import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Models/User';
import { UserService } from '../../Service/user.service';
import { Workbook, Worksheet } from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';
import { Loans } from '../../Models/Loans';
import { LoansService } from 'src/app/Service/loans.service';
import { UserUser_incomeService } from 'src/app/Service/user-income.service';
import { AmutaDepositService } from 'src/app/Service/amuta-deposit.service';
import { Amuta_deposits } from 'src/app/Models/Amuta_deposits';
import { User_expense } from 'src/app/Models/User_expense';
import { User_income } from 'src/app/Models/user_income';
import { UserExOrInDetailsService } from 'src/app/Service/user-ex-or-in-details.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loans: Loans[]=[];
  lData: User_expense[]=[];
  lData2: User_expense[]=[];
  lDataLoans: Loans[]=[];
  lDataAmutaD: Amuta_deposits[]=[];
  lDataIncome: User_income[]=[];
  allExpensesValue=0;
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
  selectedYear = new Date().getUTCFullYear();
  selectedMonth = this.month[new Date().getMonth()];
  selectedMonthVal = new Date().getMonth() + 1;
  constructor(
    private router: Router,
    private usService: UserService,
    private actRoute: ActivatedRoute,
    private loanService: LoansService,
     private amutaService: AmutaDepositService,
         private service: UserExOrInDetailsService,
            private inService: UserUser_incomeService,
  ) {}
  lang;

  user: User;
  isAdmin = false;
  private id: string;
calculateSumVal  =0;
  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    this.isAdmin = false;
    this.user =  <User>JSON.parse(localStorage.getItem('user'));
    console.log( this.user);
    if (this.user != null) {
      this.isAdmin = this.user.is_admin;

      this.refreshAmutaList();
       this.refreshExpenseList();
        this.refreshIncomeList();
           this.refreshLoansList();
           this.calculateSum();
    } else {
      this.isAdmin = false;

    }
    this.usService.user.subscribe((x) => {
      this.user = x;
      if (x != null) {

        this.isAdmin = x.is_admin;
      } else {
        this.isAdmin = false;

      }
    });
  }

  calculateSum() {
  
    this.usService.calculateSum(this.selectedYear, this.selectedMonthVal, this.user.id_user).subscribe((data) => {
      this.calculateSumVal = data;
    });
  }
  refreshExpenseList() {
  
    this.service.getExpenseList(this.selectedYear, this.selectedMonthVal, this.user.id_user).subscribe((data) => {
      if(data)
      {
      this.lData = data.filter((x) => x.id_kind === 1);

   
      this.lData2 = data.filter((x) => x.id_kind === 2);
    
      this.allExpensesValue = data.reduce((acc, cur) => acc + cur.sum, 0);
    }});
  }
  refreshIncomeList() {
 
    this.inService
      .getUser_incomeList(this.selectedYear, this.selectedMonthVal, this.user.id_user)
      .subscribe((data) => {
        this.lDataIncome = data;
     
      });
  }
  refreshLoansList() {
  
    this.loanService
      .calcLoansByUserIdMonthYear(this.user.id_user, this.selectedMonthVal, this.selectedYear)
      .subscribe((data) => {
        this.lDataLoans = data;

      });
  }
  refreshAmutaList() {
    this.amutaService
      .getAmutaDepByUserIdMonthYear(this.user.id_user, this.selectedYear, this.selectedMonthVal)
      .subscribe((data) => {
        this.lDataAmutaD = data;
      
      });
  }

  changeLang(lang) {
    console.log(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  // downloadExcelLoans() {
  //   var user =  <User>JSON.parse(localStorage.getItem('user'));
  //   this.loanService.getLoansByUserId(user.id_user).subscribe((data) => {
  //     this.loans = data;

  //     let workbook = new Workbook();
  //     let worksheet = workbook.addWorksheet(
  //       'loans' + new Date().getUTCFullYear()
  //     );

  //     worksheet = worksheetAddTitleRow(worksheet, '  פרטי ההלואות ');
  //     worksheet = worksheetAddHeaderRow(worksheet, [
  //       'פרטים',
  //       'תאריך',
  //       'סכום חודשי',
  //       'ריבית',
  //       'סכום',
  //     ]);

  //     for (let element of this.loans) {
  //       let temp = [];
  //       temp.push(element.loan_info);

  //       temp.push(
  //         new Date(element.date_ofLoan)
  //           .toISOString()
  //           .substring(0, 10)
  //           .replace('T', ' ')
  //       );
  //       temp.push(element.sum_month + ' שח');
  //       temp.push(element.ribit + '%');
  //       temp.push(element.sum + ' שח');

  //       worksheet.addRow(temp);
  //     }
  //     var allLoansSum = this.loans.reduce((acc, cur) => acc + cur.sum, 0);
  //     worksheet = worksheetAddTitleRow(
  //       worksheet,
  //       ' סך כל ההלואות ' + allLoansSum + ' שח'
  //     );

  //     //set downloadable file name
  //     let fname = 'KeyMoneyLoans';

  //     //add data and file name and download
  //     workbook.xlsx.writeBuffer().then((data) => {
  //       let blob = new Blob([data], {
  //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //       });
  //       fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
  //     });
  //   });
  // }
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

