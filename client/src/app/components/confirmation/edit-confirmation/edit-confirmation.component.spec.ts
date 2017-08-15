import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmationComponent } from './edit-confirmation.component';

describe('EditConfirmationComponent', () => {
  let component: EditConfirmationComponent;
  let fixture: ComponentFixture<EditConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
