import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RequestServiceService {

  constructor(private http: HttpClient) { }

  // Get All User from users API
  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  // Get All Post
  getAllPost() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  // Get All Post according to user id
  getPost(userId: number) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts?userId=' + userId);
  }

  /*  Add New Post But this is fake url and we couldn't perform save Post but I have to
  Done with the help of array storing.
  */
  addPost(newPost: any) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', newPost);
  }

  /* Update Post But this is fake url and we couldn't perform update Post but I have to
  Done with the help of array updating.
  */
  updatePost(postId: number, updatePost: any) {
    return this.http.put('https://jsonplaceholder.typicode.com/posts/' + postId, updatePost);
  }

  /* Delete Post But this is fake url and we couldn't perform delete Post but I have to
  Done with the help of array pop element.
  */
  deletePost(postId: any) {
    return this.http.delete('https://jsonplaceholder.typicode.com/posts/' + postId);
  }
}
