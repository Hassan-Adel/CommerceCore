import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatCardModule, MatListModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class AppMaterialModule { }
