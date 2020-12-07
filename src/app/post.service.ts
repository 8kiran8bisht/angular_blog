import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';

const perPage: number = 6;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  blog_api_url: string = `https://web422assignment5blogapi.herokuapp.com/api`;

  constructor(private http: HttpClient) { }

  getPosts(page:any, tag:string, category:string): Observable<BlogPost[]> {
    let params = {
      page: page,
      perPage: perPage.toString(),
      category: category || '',
      tag: tag || '',
    }

    return this.http.get<BlogPost[]>(`${this.blog_api_url}/posts`, { params });
  }

  getPostById(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.blog_api_url}/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.blog_api_url}/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.blog_api_url}/tags`);
  }

  getAllPosts():Observable<BlogPost[]>{
    let params = {
      page: "1",
      perPage: Number.MAX_SAFE_INTEGER.toString()
    }
    return this.http.get<BlogPost[]>(`${this.blog_api_url}/posts`,{params});
  }

  newPost(data: BlogPost): Observable<any>{
    return this.http.post<any>(`${this.blog_api_url}/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any>{
    return this.http.put<any>(`${this.blog_api_url}/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any>{
    return this.http.delete<any>(`${this.blog_api_url}/posts/${id}`);
  }
}
