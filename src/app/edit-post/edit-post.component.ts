import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit, OnDestroy {
  tags: string;
  blogPost: BlogPost;
  private postSub: any;
  private updateSub: any;
  private deleteSub: any;

  constructor(private data: PostService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.postSub = this.data.getPostById(this.activatedRoute.snapshot.params['id']).subscribe(data => {
      this.blogPost = data;
      this.tags = data.tags.toString();
    })
  }

  
  formSubmit(): void {
    this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
    this.updateSub=this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => this.router.navigate(['admin']));
  }
  
  deletePost(id: string) {
    this.deleteSub=this.data.deletePostById(id).subscribe(() => this.router.navigate(['admin']));
  }
  
  ngOnDestroy() {
    if (this.postSub) this.postSub.unsubscribe();
    if (this.updateSub) this.updateSub.unsubscribe();
    if (this.deleteSub) this.deleteSub.unsubscribe();
  }

}