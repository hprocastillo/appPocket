import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPocketComponent } from './new-pocket.component';

describe('NewPocketComponent', () => {
  let component: NewPocketComponent;
  let fixture: ComponentFixture<NewPocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPocketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
