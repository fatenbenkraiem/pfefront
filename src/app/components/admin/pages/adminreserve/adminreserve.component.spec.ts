import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminreserveComponent } from './adminreserve.component';

describe('AdminreserveComponent', () => {
  let component: AdminreserveComponent;
  let fixture: ComponentFixture<AdminreserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminreserveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminreserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
