import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game/game.component';
import { HelloWorldSceneComponent } from './scenes/hello-world-scene/hello-world-scene.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, GameComponent, HelloWorldSceneComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
