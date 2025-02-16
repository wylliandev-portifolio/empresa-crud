import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Empresa } from '../../../core/interfaces/empresa-interface';
import { EmpresaMockService } from '../../../core/services/empresa.mock.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-empresa-details',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './empresa-details.component.html',
  styleUrl: './empresa-details.component.scss'
})
export class EmpresaDetailsComponent {
  @Input() empresa?: Empresa;
  @Output() formSubmit = new EventEmitter<Partial<Empresa>>();

  empresaId?: number;
  form;

  get isEdit() { return !!this.empresa; }

  constructor(
    private fb: FormBuilder, 
    private empresaService: EmpresaMockService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.form = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/)]],
      endereco: ['', Validators.required],
      funcionarios: [0, Validators.min(0)]
    });
  }

  ngOnInit() {
    
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const idParam = Number(params.get('id'));

        if(idParam > 0){
          this.empresaId = idParam;
        }

        // Retornar caso 
        if (this.empresaId === undefined) {
          return of(null);
        }

        return this.empresaService.getEmpresaById(this.empresaId);
      })
    ).subscribe({
      next: (empresa) => {
        if(this.empresaId !== undefined) {
          if (!empresa) {
            this.router.navigate(['/empresas']);
            return;
          }
          this.empresa = empresa;
          this.form.patchValue(this.empresa);
        }
      },
      error: () => this.router.navigate(['/empresas'])
    });
  }

  onSubmit(empresaData: Empresa) {
    if (this.form.valid) {
      // Implementar lógica de submit

      if (this.empresa) {
        this.empresaService.updateEmpresa(this.empresa.id, empresaData)
          .subscribe({
            next: () => 
              this.router.navigate(['/empresas', this.empresa?.id]),
            error: (err) => console.error('Erro ao atualizar', err)
          });
      }
    }
  }
}
