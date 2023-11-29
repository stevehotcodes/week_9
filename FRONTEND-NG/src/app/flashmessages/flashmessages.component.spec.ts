import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashmessagesComponent } from './flashmessages.component';

describe('FlashmessagesComponent', () => {
  let component: FlashmessagesComponent;
  let fixture: ComponentFixture<FlashmessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlashmessagesComponent]
    });
    fixture = TestBed.createComponent(FlashmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
