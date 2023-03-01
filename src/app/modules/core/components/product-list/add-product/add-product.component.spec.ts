import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AddProductComponent } from "./add-product.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("AddProductComponent", () => {

  let fixture: ComponentFixture<AddProductComponent>;
  let component: AddProductComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [AddProductComponent]
    });

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
