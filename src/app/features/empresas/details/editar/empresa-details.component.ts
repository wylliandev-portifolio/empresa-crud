// features/empresas/edit/empresa-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EmpresaFormComponent } from '../../details/widgets/empresa-form-component';
import { EmpresaMockService } from '../../../../core/services/empresa.mock.service';
import { Empresa } from '../../../../core/interfaces/empresa-interface';

@Component({
  standalone: true,
  imports: [CommonModule, EmpresaFormComponent],
  template: `
    <div class="edit-container">
      <h1>Editar Empresa</h1>
      <app-empresa-form
        [empresa]="empresa"
        (formSubmit)="handleUpdate($event)"
        (onCancel)="handleCancel()"
      ></app-empresa-form>
    </div>
  `,
  styleUrl: './empresa-details.component.scss'
})
export class EmpresaDetailsComponent implements OnInit {
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
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.empresaService.getEmpresaById(id);
      })
    ).subscribe({
      next: empresa => {
        if (!empresa) {
          this.router.navigate(['/not-found']);
          return;
        }
        this.empresa = empresa;
      },
      error: () => this.router.navigate(['/empresas'])
    });
  }

  handleUpdate(updatedData: Partial<Empresa>) {
    if (this.empresa) {
      this.empresaService.updateEmpresa(this.empresa.id, updatedData)
        .subscribe({
          next: () => {
            this.router.navigate(['/empresas']);
          },
          error: (err) => console.error('Erro na atualização:', err)
        });
    }
  }

  handleCancel() {
    this.router.navigate(['/empresas', this.empresa?.id]);
  }
}