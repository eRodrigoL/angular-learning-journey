import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingChild } from './binding-child';

describe('BindingChild', () => {
  let component: BindingChild;
  let fixture: ComponentFixture<BindingChild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BindingChild]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BindingChild);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
