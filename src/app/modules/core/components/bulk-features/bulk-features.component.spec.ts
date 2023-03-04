import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BulkFeaturesComponent } from "./bulk-features.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BulkFeaturesComponent", () => {

  let fixture: ComponentFixture<BulkFeaturesComponent>;
  let component: BulkFeaturesComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BulkFeaturesComponent]
    });

    fixture = TestBed.createComponent(BulkFeaturesComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
