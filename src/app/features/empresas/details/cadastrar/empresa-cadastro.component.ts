// features/empresas/edit/empresa-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EmpresaFormComponent } from '../widgets/empresa-form-component';
import { EmpresaMockService } from '../../../../core/services/empresa.mock.service';
import { Empresa } from '../../../../core/interfaces/empresa-interface';

@Component({
  standalone: true,
  imports: [CommonModule, EmpresaFormComponent],
  template: `
    <div class="edit-container">
      <h1>Cadastrar Empresa</h1>
      <app-empresa-form
        [empresa]="empresa"
        (formSubmit)="handleCreate($event)"
        (onCancel)="handleCancel()"
      ></app-empresa-form>
    </div>
  `,
  styleUrl: './empresa-cadastro.component.scss'
})
export class EmpresaCadastroComponent implements OnInit {
  empresa: Empresa | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaMockService
  ) {}

  ngOnInit() {
    this.loadEmpresa();
  }

  private loadEmpresa() {
    
  }

  handleCreate(createData: Partial<Empresa>) {
    const newEmpresa: Omit<Empresa, 'id'> = {
      nome: createData.nome || '',
      cnpj: '',
      endereco: '',
      funcionarios: 0
    };
    this.empresaService.createEmpresa(newEmpresa)
      .subscribe({
        next: () => {
          this.router.navigate(['/empresas']);
        },
        error: (err) => console.error('Erro na criação:', err)
      });
  }

  handleCancel() {
    this.router.navigate(['/empresas', this.empresa?.id]);
  }
}