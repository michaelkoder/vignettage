import { ComponentFixture, TestBed } from '@angular/core/testing';

import { allProductsComponent } from './allProducts.component';

describe('allProductsComponent', () => {
  let component: allProductsComponent;
  let fixture: ComponentFixture<allProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ allProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(allProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
