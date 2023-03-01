import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentsComponent } from "./components.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ComponentsComponent", () => {

  let fixture: ComponentFixture<ComponentsComponent>;
  let component: ComponentsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ComponentsComponent]
    });

    fixture = TestBed.createComponent(ComponentsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
