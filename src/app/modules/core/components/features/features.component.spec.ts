import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FeaturesComponent } from "./features.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("FeaturesComponent", () => {

  let fixture: ComponentFixture<FeaturesComponent>;
  let component: FeaturesComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [FeaturesComponent]
    });

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
