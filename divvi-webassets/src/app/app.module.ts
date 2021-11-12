import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    UserCreationComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserCreationComponent]
})
export class AppModule { }
