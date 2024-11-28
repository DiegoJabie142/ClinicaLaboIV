import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeCantidadTurnosMedicoTiempoFinalizadoComponent } from './informe-cantidad-turnos-medico-tiempo-finalizado.component';

describe('InformeCantidadTurnosMedicoTiempoFinalizadoComponent', () => {
  let component: InformeCantidadTurnosMedicoTiempoFinalizadoComponent;
  let fixture: ComponentFixture<InformeCantidadTurnosMedicoTiempoFinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeCantidadTurnosMedicoTiempoFinalizadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformeCantidadTurnosMedicoTiempoFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
