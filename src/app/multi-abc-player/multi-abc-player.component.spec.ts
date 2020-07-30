import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAbcPlayerComponent } from './multi-abc-player.component';

describe('MultiAbcPlayerComponent', () => {
  let component: MultiAbcPlayerComponent;
  let fixture: ComponentFixture<MultiAbcPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiAbcPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAbcPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
