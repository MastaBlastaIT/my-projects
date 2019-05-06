import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PipeListModule} from './pipe-list/pipe-list.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, PipeListModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
