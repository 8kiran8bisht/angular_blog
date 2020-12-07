import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  blogPosts: Array<BlogPost>;
  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub: Subscription;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.activatedRoute.queryParams.subscribe(params => {
      
      if (params['tag']) {
        this.tag = params['tag'];
        this.category = null;
      } else {
        this.tag = null;
      }

      if (params['category']) {
        this.category = params['category'];
        this.tag = null;
      } else {
        this.category = null;
      }

      this.getPage(+params['page'] || 1);

    });
  }


  getPage(num: number): void {
    this.postService.getPosts(num, this.tag, this.category).subscribe(data => {
      if (data.length > 0) {
        this.blogPosts = data;
        this.page = num;
      }
    });

    window.scrollTo(0,0);
  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }

}
