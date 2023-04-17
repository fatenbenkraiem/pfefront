import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintypeComponent } from './admintype.component';

describe('AdmintypeComponent', () => {
  let component: AdmintypeComponent;
  let fixture: ComponentFixture<AdmintypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmintypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmintypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
