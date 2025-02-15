import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Empresa } from '../../../core/interfaces/empresa-interface';
import { EmpresaMockService } from '../../../core/services/empresa.mock.service';

@Component({
  selector: 'app-empresa-details',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './empresa-details.component.html',
  styleUrl: './empresa-details.component.scss'
})
export class EmpresaDetailsComponent {
  @Input() empresa?: Empresa;
  
  form;

  get isEdit() { return !!this.empresa; }

  constructor(
    private fb: FormBuilder, 
    private service: EmpresaMockService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/)]],
      endereco: ['', Validators.required]
    });

    if (this.empresa) {
      this.form.patchValue(this.empresa);
    }

    this.getById();
  }

  onSubmit() {
    if (this.form.valid) {
      // Implementar lógica de submit
    }
  }

  getById(){
    if (this.empresa?.id !== undefined) {
      this.service.getEmpresasById(this.empresa.id).subscribe(empresa => this.empresa = empresa);
    }
  }
}
