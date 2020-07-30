import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcPlayerComponent } from './abc-player.component';

describe('AbcPlayerComponent', () => {
  let component: AbcPlayerComponent;
  let fixture: ComponentFixture<AbcPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbcPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
