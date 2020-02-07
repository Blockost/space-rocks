import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloWorldSceneComponent } from './scenes/hello-world-scene/hello-world-scene.component';
import { MainSceneComponent } from './scenes/main-scene/main-scene.component';

@NgModule({
  declarations: [AppComponent, HelloWorldSceneComponent, MainSceneComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
