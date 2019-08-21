import { Component, OnInit } from '@angular/core';
import { RequestServiceService } from '../../request-service.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any;
  title: string;

  constructor(private request: RequestServiceService, private route: Router) { }

  ngOnInit() {
    this.getAllUsers();
    this.title = 'User Lobby';
  }

  // Get All User
  getAllUsers: any = async () => {
    await this.request.getUsers().subscribe((res) => {
      this.users = res;
      console.log('Request: ', res);
    });
  }

  // view post according to user
  viewPost: any = (userId: number) => {
    this.route.navigate(['/post/' + userId]);
  }
}
