import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { CdkTableModule } from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
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
import { DiagramThisYearInAndExpComponent } from './Diagrams/diagram-this-year-in-and-exp/diagram-this-year-in-and-exp.component';
import { DiagramInvestmentSavingComponent } from './Diagrams/diagram-investment-saving/diagram-investment-saving.component';
import { CreateMaazanComponent } from './User_page/create-maazan/create-maazan.component';
import { OldMaazanimComponent } from './User_page/old-maazanim/old-maazanim.component';
import { InvestmentComponent } from './User_page/investment/investment.component';
import { UserAccountComponent } from './User_page/user-account/user-account.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorMessageComponent } from './Components/error-message/error-message.component';
import { ModalContainerComponent } from 'angular-bootstrap-md';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableExpensesInYearsComponent } from './Components/table-expenses-in-years/table-expenses-in-years.component';
import { EditTableExpenseInYearComponent } from './Components/edit-table-expense-in-year/edit-table-expense-in-year.component';
import { AddTableExpenseInYearComponent } from './Components/add-table-expense-in-year/add-table-expense-in-year.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DailyExpenseComponent } from './User_page/daily-expense/daily-expense.component';
import { TableLoansComponent } from './table-loans/table-loans.component';
import { TableEditLoanComponent } from './table-edit-loan/table-edit-loan.component';
import { TableAddLoanComponent } from './table-add-loan/table-add-loan.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryComponent } from './Diagrams/category/category.component';
import { EmailServiceService } from './Service/email-service.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const routs: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'add-new-user', component: AddNewUserComponent },

  { path: 'table-expenses-in-years', component: TableExpensesInYearsComponent },
  { path: 'add-table-expense-in-year', component: AddTableExpenseInYearComponent },
  { path: 'edit-table-expense-in-year', component: EditTableExpenseInYearComponent },

  { path: 'create-maazan', component: CreateMaazanComponent },
  { path: 'investment', component: InvestmentComponent },
  { path: 'old-maazanim', component: OldMaazanimComponent },
  { path: 'user-account', component: UserAccountComponent },

  { path: 'daily-expense', component: DailyExpenseComponent },
  { path: 'myForm-new-expense', component: FormNewExpenseComponent },
  { path: 'form-new-income', component: FormNewIncomeComponent },

  { path: 'diagram-investment-saving', component: DiagramInvestmentSavingComponent },
  { path: 'diagram-this-year-in-and-exp', component: DiagramThisYearInAndExpComponent },

  { path: 'table_loans', component: TableLoansComponent },
  { path: 'edit_loan', component: TableEditLoanComponent },
  { path: 'add_loan', component: TableAddLoanComponent },
  
  {path:'category',component:CategoryComponent},

  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
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
    CreateMaazanComponent,
    OldMaazanimComponent,
    InvestmentComponent,
    UserAccountComponent,
    ContactComponent,
    ErrorMessageComponent,
    TableExpensesInYearsComponent,
    EditTableExpenseInYearComponent,
    AddTableExpenseInYearComponent,
    DailyExpenseComponent,
    TableEditLoanComponent,
    TableAddLoanComponent,
    TableLoansComponent,
    CategoryComponent, 
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
        deps: [HttpClient]
      }
    }),
    MdbCarouselModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
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
    MatFormFieldModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true
    },
    EmailServiceService,HttpClient
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA
    ,NO_ERRORS_SCHEMA]

})
export class AppModule { }
