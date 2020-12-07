import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {
  commentName: string;
  commentText: string;
  post: BlogPost;
  private querySub: any;
  private updateSub: any;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.activatedRoute.params.subscribe(params => {
      this.postService.getPostById(params['id']).subscribe(data => {
        this.post = data;
        this.post.views++;
        this.postService.updatePostById(this.post._id, this.post).subscribe();
      });
    });
  }

  submitComment(): void {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    });
    this.updateSub = this.postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = '';
      this.commentText = '';
    })
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
    if (this.updateSub) this.updateSub.unsubscribe();
  }

}

