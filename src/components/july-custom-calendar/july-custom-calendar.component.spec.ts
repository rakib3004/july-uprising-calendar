import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JulyCustomCalendarComponent } from './july-custom-calendar.component';

describe('JulyCustomCalendarComponent', () => {
  let component: JulyCustomCalendarComponent;
  let fixture: ComponentFixture<JulyCustomCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JulyCustomCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JulyCustomCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
