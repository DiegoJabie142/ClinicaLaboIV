import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeLogsUsuariosComponent } from './informe-logs-usuarios.component';

describe('InformeLogsUsuariosComponent', () => {
  let component: InformeLogsUsuariosComponent;
  let fixture: ComponentFixture<InformeLogsUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeLogsUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformeLogsUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
