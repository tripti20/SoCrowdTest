import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveGamesComponent } from './live-games.component';

describe('LiveGamesComponent', () => {
  let component: LiveGamesComponent;
  let fixture: ComponentFixture<LiveGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
