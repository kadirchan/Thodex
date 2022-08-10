import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSendAmountComponent } from './input-send-amount.component';

describe('InputSendAmountComponent', () => {
  let component: InputSendAmountComponent;
  let fixture: ComponentFixture<InputSendAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSendAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSendAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
