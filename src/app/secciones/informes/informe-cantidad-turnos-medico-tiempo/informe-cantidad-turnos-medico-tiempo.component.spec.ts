import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeCantidadTurnosMedicoTiempoComponent } from './informe-cantidad-turnos-medico-tiempo.component';

describe('InformeCantidadTurnosMedicoTiempoComponent', () => {
  let component: InformeCantidadTurnosMedicoTiempoComponent;
  let fixture: ComponentFixture<InformeCantidadTurnosMedicoTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeCantidadTurnosMedicoTiempoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformeCantidadTurnosMedicoTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
