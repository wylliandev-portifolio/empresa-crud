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

  getEmpresasById(id: number) {
    return of(this.empresas$.value.find(e => e.id === id));
  }

  createEmpresa(empresa: Omit<Empresa, 'id'>) {
    const newEmpresa = { ...empresa, id: Date.now() };
    this.empresas$.next([...this.empresas$.value, newEmpresa]);
    return of(newEmpresa);
  }

  updateEmpresa(id: number, empresa: Partial<Empresa>) {
    const updated = this.empresas$.value.map(e => 
      e.id === id ? { ...e, ...empresa } : e
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
