import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  constructor(private route: Router) { }

  ngOnInit() {
    console.log('title: ', this.title);
  }

  async home() {
    this.route.navigate(['/']);
  }

}
