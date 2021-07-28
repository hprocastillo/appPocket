import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPocketsComponent } from './list-pockets.component';

describe('ListPocketsComponent', () => {
  let component: ListPocketsComponent;
  let fixture: ComponentFixture<ListPocketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPocketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
