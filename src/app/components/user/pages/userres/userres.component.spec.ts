import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserresComponent } from './userres.component';

describe('UserresComponent', () => {
  let component: UserresComponent;
  let fixture: ComponentFixture<UserresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
