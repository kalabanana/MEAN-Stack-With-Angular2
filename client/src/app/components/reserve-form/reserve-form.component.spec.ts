import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveFormComponent } from './reserve-form.component';

describe('ReserveFormComponent', () => {
  let component: ReserveFormComponent;
  let fixture: ComponentFixture<ReserveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
