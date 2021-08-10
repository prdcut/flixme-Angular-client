import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})


export class NavBarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, public router: Router) { }

  ngOnInit(): void {
  }

  menuItems: MenuItem[] = [
    {
      label: 'All Movies',
      icon: 'movie',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      route: '/movies'
    },
    {
      label: 'My Profile',
      icon: 'perm_identity',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      route: '/profile'
    },
    {
      label: 'Log Out',
      icon: 'logout',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      route: '/welcome'
    },
  ];

  logOutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('You have logged out succesfully', 'OK', {
      duration: 4000,
    });
  }

}