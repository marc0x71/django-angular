import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    SideMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Front-end';
  isLogged: boolean = true;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private authService: AuthService, private router: Router) {
    authService.isLoggedIn().subscribe(loginStatus => this.isLogged = loginStatus);
    console.log("production: " + environment.production);
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
  }

  openMenu() {
    console.log('open!');
    this.sidenav.toggle();
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigateByUrl(this.router.url, {
      onSameUrlNavigation: 'reload',
      skipLocationChange: true,
    });
  }
}
