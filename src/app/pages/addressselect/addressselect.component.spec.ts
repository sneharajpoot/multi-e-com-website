import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressselectComponent } from './addressselect.component';

describe('AddressselectComponent', () => {
  let component: AddressselectComponent;
  let fixture: ComponentFixture<AddressselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
