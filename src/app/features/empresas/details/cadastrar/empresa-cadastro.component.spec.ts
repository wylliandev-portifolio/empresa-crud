import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaCadastroComponent } from './empresa-cadastro.component';

describe('EmpresaCadastroComponent', () => {
  let component: EmpresaCadastroComponent;
  let fixture: ComponentFixture<EmpresaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
