import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskManagementSystem-App';
  constructor(private authService: AuthService) {
    // Check for a valid token in local storage
    const token = this.authService.getToken();
    if (token) {
      this.authService.setAuthenticated(true);
    }
  }
  
}
