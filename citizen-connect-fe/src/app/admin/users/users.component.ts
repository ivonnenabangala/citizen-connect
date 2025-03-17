import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  editMode?: boolean;
  selectedRole?: string;
}
@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users: User[] = [];
  roles: string[] = ['user', 'admin', 'government official'];
  
  constructor(
    private http: HttpClient,
    private authService: LoginService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<User[]>('http://localhost:4000/users/allUsers')
      .subscribe(users => {
        this.users = users;
      });
  }

  enableEditMode(user: User): void {
    user.editMode = true;
    user.selectedRole = user.role;
  }

  private getOptions() {
      const token = this.authService.getToken()
      return{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    }
  updateUserRole(user: User): void {
    if (!user.selectedRole) return;
    
    this.http.patch(`http://localhost:4000/users/updateUser/${user.id}`, 
    { role: user.selectedRole }, this.getOptions())
      .subscribe(() => {
        if (user.selectedRole) {
          user.role = user.selectedRole;
        }
        user.editMode = false;
        // Show success message to user
      }, error => {
        console.error('Error updating user role:', error);
        // Show error message to user
      });
  }
  cancelEdit(user: User): void {
    user.editMode = false;
    user.selectedRole = user.role;
  }

}
