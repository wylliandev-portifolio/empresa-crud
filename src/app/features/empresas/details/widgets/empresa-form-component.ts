// shared/empresa-form/empresa-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Empresa } from '../../../../core/interfaces/empresa-interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-empresa-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Nome" formControlName="nome">
        <mat-error *ngIf="form.get('nome')?.hasError('required')">
          Campo obrigatório
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="CNPJ" formControlName="cnpj" 
               mask="00.000.000/0000-00">
        <mat-error *ngIf="form.get('cnpj')?.hasError('required')">
          Campo obrigatório
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="Endereço" formControlName="endereco">
      </mat-form-field>

      <div class="form-actions">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          <mat-icon>save</mat-icon>
          {{ isEditMode ? 'Atualizar' : 'Cadastrar' }}
        </button>
        
        <button mat-button type="button" (click)="onCancel.emit()">
          Cancelar
        </button>
      </div>
      
    </form>
  `
  })



export class EmpresaFormComponent implements OnInit {
  @Input() set empresa(value: Empresa | null) {
    if (value) {
      this.isEditMode = true;
      this.form.patchValue(value);
    }
  }
  
  @Output() formSubmit = new EventEmitter<Partial<Empresa>>();
  @Output() onCancel = new EventEmitter<void>();
  form;
  isEditMode = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', [Validators.required]],
      endereco: [''],
      funcionarios: [0]
    });
  }

  ngOnInit(): void {

    
    }

  onSubmit() {
    if (this.form.valid) {
      const formValue: Partial<Empresa> = {
        ...this.form.value,
        nome: this.form.value.nome || '',
        cnpj: this.form.value.cnpj || '',
        endereco: this.form.value.endereco || '',
        funcionarios: this.form.value.funcionarios || 0
      };
      this.formSubmit.emit(formValue);
    }
  }
}