import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Models/User';
import { UserService } from '../../Service/user.service';
import { Workbook, Worksheet } from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';
import { Loans } from '../../Models/Loans';
import { LoansService } from 'src/app/Service/loans.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loans: Loans[];
  constructor(
    private router: Router,
    private service: UserService,
    private actRoute: ActivatedRoute,
    private loanService: LoansService
  ) {}
  lang;
  isUser = false;
  user: User;
  isAdmin = false;
  private id: string;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    this.isAdmin = false;
    this.user =  <User>JSON.parse(localStorage.getItem('user'));
    if (this.user != null) {
      this.isUser = true;
      this.isAdmin = this.user.is_admin;
    } else {
      this.isAdmin = false;
      this.isUser = false;
    }
    this.service.user.subscribe((x) => {
      this.user = x;
      if (x != null) {
        this.isUser = true;
        this.isAdmin = x.is_admin;
      } else {
        this.isAdmin = false;
        this.isUser = false;
      }
    });
  }

  changeLang(lang) {
    console.log(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  downloadExcelLoans() {
    var user =  <User>JSON.parse(localStorage.getItem('user'));
    this.loanService.getLoansByUserId(user.id_user).subscribe((data) => {
      this.loans = data;

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet(
        'loans' + new Date().getUTCFullYear()
      );

      worksheet = worksheetAddTitleRow(worksheet, '  פרטי ההלואות ');
      worksheet = worksheetAddHeaderRow(worksheet, [
        'פרטים',
        'תאריך',
        'סכום חודשי',
        'ריבית',
        'סכום',
      ]);

      for (let element of this.loans) {
        let temp = [];
        temp.push(element.loan_info);

        temp.push(
          new Date(element.date_ofLoan)
            .toISOString()
            .substring(0, 10)
            .replace('T', ' ')
        );
        temp.push(element.sum_month + ' שח');
        temp.push(element.ribit + '%');
        temp.push(element.sum + ' שח');

        worksheet.addRow(temp);
      }
      var allLoansSum = this.loans.reduce((acc, cur) => acc + cur.sum, 0);
      worksheet = worksheetAddTitleRow(
        worksheet,
        ' סך כל ההלואות ' + allLoansSum + ' שח'
      );

      //set downloadable file name
      let fname = 'KeyMoneyLoans';

      //add data and file name and download
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
      });
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
