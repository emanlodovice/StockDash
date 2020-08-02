import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGraphFormComponent } from './stock-graph-form.component';

describe('StockGraphFormComponent', () => {
  let component: StockGraphFormComponent;
  let fixture: ComponentFixture<StockGraphFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockGraphFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockGraphFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
