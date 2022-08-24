import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router'

import { Post } from './post.model';
// import { Router } from 'express';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[],postCount:number}>();

  constructor(private http: HttpClient, private router: Router){}

  getPosts(postsPerPage:number, currentPage:number){
   const queryParams =`?pageSize=${postsPerPage}&page=${currentPage}}`;
   this.http.get<{message: string, posts: any, maxPosts:number }>('http://localhost:3000/api/posts' + queryParams)
   .pipe(map((postData) => {
      return{ posts: postData.posts.map((post: { title: any; content: any; _id: any; }) => {
        return ({
          title: post.title,
          content: post.content,
          id: post._id
        });
      }),
      maxposts: postData.maxPosts
    };
   }))
   .subscribe((transformedPostData) => {
    this.posts = transformedPostData.posts;
    this.postsUpdated.next({posts:[...this.posts], postCount:transformedPostData.maxposts
    });
   });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  addPost( title: string, content: string){
    const post: Post={id: '', title: title, content: content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      this.router.navigate(["/"]);
    })
  }

  updatePost(id: string, title: string, content: string){
    const post: Post= {id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/' + id, post)
    .subscribe(response => {

      this.router.navigate(['/']);
    });
  }


  deletePost(postId: string){
    return this.http.delete('http://localhost:3000/api/posts/' + postId);;

  }
}
