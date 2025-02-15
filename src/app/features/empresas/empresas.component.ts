import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmpresaMockService } from '../../core/services/empresa.mock.service';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../../core/interfaces/empresa-interface';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
export class EmpresasComponent {
   empresas$ = new BehaviorSubject<Empresa[]>([]);
  
  constructor(private service: EmpresaMockService) {

  }
  

  
  deleteEmpresa(id: number) {
    this.service.deleteEmpresa(id).subscribe();
  }
}
