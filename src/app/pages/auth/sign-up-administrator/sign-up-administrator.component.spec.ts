import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpAdministratorComponent } from './sign-up-administrator.component';

describe('SignUpAdministratorComponent', () => {
  let component: SignUpAdministratorComponent;
  let fixture: ComponentFixture<SignUpAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpAdministratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
