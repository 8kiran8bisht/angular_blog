/************************************************************************************************************ 
 * WEB422 – Assignment 06 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
 * assignment has been copied manually or electronically from any other source (including web sites) or 
 * distributed to other students. 
 * 
 * Name: Kiran Bisht Student ID: 154683189 Date: 12/06/2020 
 * 
 * 
 * Heroku Link:  https://web422-angular-blog-2020.herokuapp.com
 *  
 * 
 * ***********************************************************************************************************/

import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web Final Assignment';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        window.scroll(0, 0);
      }
    });
  }
}
