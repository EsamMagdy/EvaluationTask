import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProductListComponent } from "./product-list.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ProductListComponent", () => {

  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProductListComponent]
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
