import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Loans } from '../../../Models/Loans';
import { LoansService } from '../../../Service/loans.service';
import { TableAddLoanComponent } from '../table-add-loan/table-add-loan.component';
import { TableEditLoanComponent } from '../table-edit-loan/table-edit-loan.component';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { User } from '../../../Models/User';

import { Workbook, Worksheet } from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';
@Component({
  selector: 'table_loans',
  templateUrl: './table-loans.component.html',
  styleUrls: ['./table-loans.component.css'],
})
export class TableLoansComponent implements OnInit {
  userId: string;
  loans: Loans[];
  constructor(
    private service: LoansService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshAuthoList();
    });
  }

  ngOnInit(): void {
    this.userId = (<User>JSON.parse(localStorage.getItem('user'))).id_user;
    this.refreshAuthoList();
  }

  ListData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Options',
    'id_loan',
    'id_expense',
    'loan_info',
    'date',
    'sum',
    'prisa',
    'alert',
  ];

  // @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filtervalue: string) {
    this.ListData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onEdit(dep: Loans) {
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
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
      this.refreshAuthoList();
    });
  }

  onDelete(id: string) {
    var self = this;
    Swal.fire({
      title: 'מחיקת הלוואה',
      text: 'האם את/ה בטוח/ה שאת/ה רוצה למחוק את ההלוואה?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'מחק',
      cancelButtonText: 'ביטול',
    }).then(function (result) {
      if (result.value) {
        self.service.deleteLo(id).subscribe((res) => {
          self.refreshAuthoList();
          Swal.fire('הי', 'המחיקה בוצעה בהצלחה', 'success');
        });
      }
    });
  }
  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '90%';
    const dialogRef = this.dialog.open(TableAddLoanComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.refreshAuthoList();
    });
  }

  refreshAuthoList() {
    this.service.getLoansByUserId(this.userId).subscribe((data) => {
      this.loans = data;
      this.ListData = new MatTableDataSource(data);
      // this.ListData.sort = this.sort;
    });
  }
  downloadExcel() {
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
      temp.push(element.sum_month+ ' שח');
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
