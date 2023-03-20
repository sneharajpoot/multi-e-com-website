import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivecyPolicyComponent } from './privecy-policy.component';

describe('PrivecyPolicyComponent', () => {
  let component: PrivecyPolicyComponent;
  let fixture: ComponentFixture<PrivecyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivecyPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivecyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
