import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Empresa } from '../interfaces/empresa-interface';


@Injectable({ providedIn: 'root' })
export class EmpresaMockService {
  private empresas$ = new BehaviorSubject<Empresa[]>(this.generateMockData());
  
  constructor() { }

  getEmpresas() {
    return this.empresas$.asObservable();
  }

  getEmpresaById(id: number) {
    const empresa = this.empresas$.value.find(e => e.id === id);
    return of(empresa);
  }

  createEmpresa(empresa: Omit<Empresa, 'id'>) {
    const newEmpresa = { ...empresa, id: Date.now() };
    this.empresas$.next([...this.empresas$.value, newEmpresa]);
    return of(newEmpresa);
  }

  updateEmpresa(id: number, empresa: Partial<Empresa>) {
    const empresa222 = this.empresas$.getValue().find(e => e.id === id);
    const asnasa= empresa.nome;

    const updated = this.empresas$.value.map(
      e => 
      {
        if(e.id === id) {
          return {
             ...e, ...empresa 
            }
        }
        else
          return e;
      }
    );
    this.empresas$.next(updated);
    return of(updated.find(e => e.id === id));
  }

  deleteEmpresa(id: number) {
    const filtered = this.empresas$.value.filter(e => e.id !== id);
    this.empresas$.next(filtered);
    return of(true);
  }

  private generateMockData(): Empresa[] {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      nome: `Empresa ${i + 1}`,
      cnpj: this.generateCNPJ(),
      endereco: `Rua ${i + 1}, 100${i}`,
      funcionarios: Math.floor(Math.random() * 100)
    }));
  }

  private generateCNPJ(): string {
    return 'XX.XXX.XXX/0001-XX'.replace(/X/g, () => 
      Math.floor(Math.random() * 10).toString()
    );
  }
}
