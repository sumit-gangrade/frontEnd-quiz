import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RequestServiceService } from '../../request-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postForm: FormGroup;
  userId: number;
  title: string;
  posts: any;
  editMode: boolean;

  constructor(private route: ActivatedRoute, private request: RequestServiceService) {
    this.route.params.subscribe(params => this.userId = parseInt(params.userId));
    this.editMode = false;
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      userId: new FormControl(this.userId),
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
    console.log('userID: ', this.userId);
    this.getUsersPost();
    this.title = 'View Post';
  }

  async getUsersPost() {
    if (this.userId) {
      // For specific user post
      await this.request.getPost(this.userId).subscribe((post) => {
        console.log('User Post: ', post);
        this.posts = post;
      });
    } else {
      // For all user post [shown in only using http:localhost:4200/posts]
      await this.request.getAllPost().subscribe((post) => {
        console.log('User Post: ', post);
        this.posts = post;
      });
    }
  }

  /* Add New Post [We can replace this function as per real REST APIs]
    
  */
  async addNewPost() {
    console.log('Add new post: ', this.postForm.value);
    await this.request.addPost(this.postForm.value).subscribe((post) => {
      // Fake URL is not process Data manipulation that why i just perform with the help of array manipulation.
      this.posts.push(post);
      console.log('Response: ', post);
      this.postForm.reset();
    });
  }

  // Edit Post
  async editPost(postId: number) {
    this.editMode = true;
    console.log('Edit Post: ', postId);
    this.posts.filter(posts => posts.id == postId).map((post) => {
      this.postForm = new FormGroup({
        title: new FormControl(post.title),
        body: new FormControl(post.body),
        userId: new FormControl(post.userId),
        id: new FormControl(post.id)
      });
    });
  }

  // Update Post
  async updatePost() {
    this.editMode = true;
    console.log('Update Post: ', this.postForm.value);
    // Service Request
    await this.request.updatePost(this.postForm.value.id, this.postForm.value).subscribe((post) => {
      // Fake URL is not process Data Manipulation that why i just perform with the help of array manipulation.
      this.posts.filter(posts => posts.id == this.postForm.value.id).map((postDetails) => {
        console.log('Search Post: ', postDetails);
        postDetails.title = this.postForm.value.title;
        postDetails.body = this.postForm.value.body;
        this.editMode = false;
        this.postForm.reset();
      });
    });
  }

  // Delete Post
  async deletePost(postId: number) {
    console.log('Delete Post: ', postId);
    // Service Request
    await this.request.deletePost(postId).subscribe((post) => {
      const index = this.posts.findIndex(i => i.id == postId);
      this.posts.splice(index, 1);
      console.log('Index: ', index);
    });
  }

  // Reset Form
  async resetForm() {
    console.log('reset form');
    this.editMode = false;
  }
}
