import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    NgxChartsModule
    ]
})
export class DashboardComponent implements OnInit {
  selectedCompany = 'Empresa A';
  selectedYear = 2023;
  
  companies = ['Empresa A', 'Empresa B', 'Empresa C'];
  years = [2021, 2022, 2023];

  // Dados de exemplo
  salesData: any[] = [];
  marketShareData: any[] = [];
  revenueData: any[] = [];

  ngOnInit() {
    this.updateDashboard();
  }

  updateDashboard() {
    // Atualiza os dados baseados nos filtros
    this.generateSalesData();
    this.generateMarketShareData();
    this.generateRevenueData();
  }

  private generateSalesData() {
    this.salesData = [{
      name: this.selectedCompany,
      series: Array.from({length: 12}, (_, i) => ({
        name: `${i+1}/${this.selectedYear}`,
        value: Math.floor(Math.random() * 1000) + 500
      }))
    }];
  }

  private generateMarketShareData() {
    this.marketShareData = [
      { name: 'Produto A', value: Math.random() * 100 },
      { name: 'Produto B', value: Math.random() * 100 },
      { name: 'Produto C', value: Math.random() * 100 }
    ];
  }

  private generateRevenueData() {
    const regions = ['Norte', 'Sul', 'Leste', 'Oeste'];
    this.revenueData = regions.map(region => ({
      name: region,
      value: Math.floor(Math.random() * 5000) + 2000
    }));
  }
}