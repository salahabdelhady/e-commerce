import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavAuthComponent } from 'src/app/components/navbar-auth/navbar-auth.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule,NavAuthComponent,RouterOutlet,FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

}