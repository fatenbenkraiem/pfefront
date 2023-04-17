import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserreserveComponent } from './userreserve.component';

describe('UserreserveComponent', () => {
  let component: UserreserveComponent;
  let fixture: ComponentFixture<UserreserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserreserveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserreserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
