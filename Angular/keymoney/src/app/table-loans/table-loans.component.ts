import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Loans } from '../Models/Loans';
import { LoansService } from '../Service/loans.service';
import { TableAddLoanComponent } from '../table-add-loan/table-add-loan.component';
import { TableEditLoanComponent } from '../table-edit-loan/table-edit-loan.component';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { User } from '../Models/User';
@Component({
  selector: 'table_loans',
  templateUrl: './table-loans.component.html',
  styleUrls: ['./table-loans.component.css'],
})
export class TableLoansComponent implements OnInit {
  userId: string;
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
    dialogConfig.width = '70%';
    console.log(dep);
    dialogConfig.data = {
      id_loan: dep,
    };
    this.dialog.open(TableEditLoanComponent, dialogConfig);
  }

  onDelete(id: string) {
    console.log(id);
    
    if (confirm('are you sure to delete?')) {
      this.service.deleteLo(id).subscribe((res) => {
        this.refreshAuthoList();
        this.snackBar.open(res.toString(), '', {
          duration: 5000,
          verticalPosition: 'top',
        });
      });
    }
  }
  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
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
      this.ListData = new MatTableDataSource(data);
      // this.ListData.sort = this.sort;
    });
  }
}
