import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    // this.http.get('http://localhost:5000/posts').subscribe(
    //   (posts: any[]) => this.posts = posts
    // );
  }

}
