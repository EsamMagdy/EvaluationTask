import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProductFilterComponent } from "./product-filter.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ProductFilterComponent", () => {

  let fixture: ComponentFixture<ProductFilterComponent>;
  let component: ProductFilterComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProductFilterComponent]
    });

    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
