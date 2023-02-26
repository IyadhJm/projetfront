import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import {AccordionModule} from 'primeng/accordion';

import {ButtonModule} from 'primeng/button';

import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

import {InputTextModule} from 'primeng/inputtext';

import {PaginatorModule} from 'primeng/paginator';

import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';

import {ToastModule} from 'primeng/toast';

import { HttpClientModule } from '@angular/common/http';
import { ProduitServiceService } from './produit-service.service';
import { ProduitComponent } from './produit/produit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesServiceService } from './categories-service.service';
import {RadioButtonModule} from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { HeaderComponent } from './header/header.component';
import { Component, OnInit } from '@angular/core';
import { MainComponent } from './main/main.component';


@NgModule({

  declarations: [
    AppComponent,
    ProduitComponent,
    CategoriesComponent,
    HeaderComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule,
    RadioButtonModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    
   
    ConfirmDialogModule,

    DialogModule,
    DropdownModule,

    InputTextModule,

    ToolbarModule,

    PaginatorModule,

    TableModule,
    TabMenuModule,
    HttpClientModule,

    ToastModule
  ],
  providers: [ProduitServiceService,CategoriesServiceService,MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
