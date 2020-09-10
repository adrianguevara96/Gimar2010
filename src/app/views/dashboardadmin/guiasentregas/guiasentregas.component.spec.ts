import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasentregasComponent } from './guiasentregas.component';

describe('GuiasentregasComponent', () => {
  let component: GuiasentregasComponent;
  let fixture: ComponentFixture<GuiasentregasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiasentregasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiasentregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
