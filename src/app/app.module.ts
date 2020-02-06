import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game/game.component';
import { HelloWorldSceneComponent } from './scenes/hello-world-scene/hello-world-scene.component';

@NgModule({
  declarations: [AppComponent, GameComponent, HelloWorldSceneComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
