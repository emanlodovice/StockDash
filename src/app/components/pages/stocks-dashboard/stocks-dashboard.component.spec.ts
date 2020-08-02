import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksDashboardComponent } from './stocks-dashboard.component';

describe('StocksDashboardComponent', () => {
  let component: StocksDashboardComponent;
  let fixture: ComponentFixture<StocksDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
