import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuntComponent } from './aunt.component';

describe('AuntComponent', () => {
  let component: AuntComponent;
  let fixture: ComponentFixture<AuntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
