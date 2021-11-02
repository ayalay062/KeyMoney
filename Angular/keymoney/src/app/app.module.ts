import { BrowserModule } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { CdkTableModule } from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AddNewUserComponent } from './Components/add-new-user/add-new-user.component';
import { PostsComponent } from './Components/posts/posts.component';
import { LanguageInterceptor } from './interceptors/language.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormNewIncomeComponent } from './Components/form-new-income/form-new-income.component';
import { FormNewExpenseComponent } from './Components/form-new-expense/form-new-expense.component';
import { DiagramThisYearInAndExpComponent } from './Components/Diagrams/diagram-this-year-in-and-exp/diagram-this-year-in-and-exp.component';
import { DiagramInvestmentSavingComponent } from './Components/Diagrams/diagram-investment-saving/diagram-investment-saving.component';

import { ContactComponent } from './Components/contact/contact.component';
import { ErrorMessageComponent } from './Components/error-message/error-message.component';
import { ModalContainerComponent } from 'angular-bootstrap-md';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableExpensesInYearsComponent } from './Components/table-expenses-in-years/table-expenses-in-years.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { DailyExpenseComponent } from './Components/daily-expense/daily-expense.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TableLoansComponent } from './Components/Loans/table-loans/table-loans.component';
import { TableEditLoanComponent } from './Components/Loans/table-edit-loan/table-edit-loan.component';
import { TableAddLoanComponent } from './Components/Loans/table-add-loan/table-add-loan.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryComponent } from './Components/Diagrams/category/category.component';
import { EmailServiceService } from './Service/email-service.service';
import { ChartsModule } from 'ng2-charts';
import { DiagramCategoryComponent } from './Components/Diagrams/diagram-category/diagram-category.component';
import { MatPseudoCheckboxModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { AdminUsersComponent } from './Components/Admin/admin-users/admin-users.component';
import { AuthGuard } from './Service/auth-guard.service';
import { FormNewAmutaComponent } from './Components/form-new-amuta/form-new-amuta.component';
import { SpinnerOverlayComponent } from './components/general/spinner-overlay/spinner-overlay.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { AllUsersComponent } from './Components/Admin/all-users/all-users.component';
import { SetUserComponent } from './Components/Admin/set-user/set-user.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const routs: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'add-new-user', component: AddNewUserComponent },
  { path: 'table-expenses-in-years', component: TableExpensesInYearsComponent },
  { path: 'daily-expense', component: DailyExpenseComponent },

  { path: 'myForm-new-expense', component: FormNewExpenseComponent },
  { path: 'form-new-income', component: FormNewIncomeComponent },
  {  path: 'diagram-this-year-in-and-exp',  component: DiagramThisYearInAndExpComponent,},

  { path: 'table_loans', component: TableLoansComponent },
  { path: 'edit_loan', component: TableEditLoanComponent },
  { path: 'add_loan', component: TableAddLoanComponent },



  { path: 'admin-users', canActivate:[AuthGuard], component: AdminUsersComponent },
  
  { path: 'category', component: DiagramCategoryComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    AddNewUserComponent,
    PostsComponent,
    FormNewIncomeComponent,
    FormNewExpenseComponent,
    DiagramThisYearInAndExpComponent,
    DiagramInvestmentSavingComponent,
    ContactComponent,
    ErrorMessageComponent,
    TableExpensesInYearsComponent,
    TableEditLoanComponent,
    TableAddLoanComponent,
    TableLoansComponent,
    CategoryComponent,
    DiagramCategoryComponent,
    AdminUsersComponent,
    FormNewAmutaComponent,
    DailyExpenseComponent,
    SpinnerOverlayComponent,
    AllUsersComponent,
    SetUserComponent,
  ],
  imports: [
    CdkTableModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MdbCheckboxModule,
    RouterModule.forRoot(routs),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MdbCarouselModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MatCheckboxModule,
    MdbRangeModule,
    MdbRippleModule,
    ChartsModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MDBBootstrapModule.forRoot(),
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'he-IL' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
   

   },
    EmailServiceService,
    HttpClient,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
