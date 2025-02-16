import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmpresaMockService } from '../../core/services/empresa.mock.service';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
export class EmpresasComponent implements OnInit {
  empresas$;
  
  constructor(private service: EmpresaMockService) {
    this.empresas$ = service.getEmpresas();
  }
  
  ngOnInit(): void {
   
  }
  
  deleteEmpresa(id: number) {
    this.service.deleteEmpresa(id).subscribe();
  }
}
