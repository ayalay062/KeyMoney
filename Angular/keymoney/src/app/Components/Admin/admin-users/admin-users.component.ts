import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { User } from '../../../Models/User';
import { UserService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  userId: string;
  constructor(
    private service: UserService,
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
  setStatus(checked:boolean, id_user:string)
  {
    this.service.SetStatusUser(id_user,checked).subscribe((data) => {
      Swal.fire('הי','העדכון בוצע בהצלחה','success');
      this.refreshAuthoList();
    });
  }
  ListData: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'Options',
    'name_user',
    'tel',
    'email',

    
  ];

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filtervalue: string) {
    this.ListData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  // onEdit(dep: User) {
  //   this.service.formData = dep;
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '50%';
  //   console.log(dep);
  //   dialogConfig.data = {
  //     id_loan: dep,
  //   };
  //   const dialogRef = this.dialog.open(TableEditLoanComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //     this.refreshAuthoList();
  //   });
  // }
  refreshAuthoList() {
    this.service.getUsers().subscribe((data) => {
      this.ListData = new MatTableDataSource(data);
      // this.ListData.sort = this.sort;
    });
  }
}
