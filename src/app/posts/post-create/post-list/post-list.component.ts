import { Component , OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "../../post.model";
import { PostsService } from "../../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy  {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post'},
  //   {title: 'Second Post', content: 'This is the second post'},
  //   {title: 'Third Post', content: 'This is the third post'},
  // ];
  posts: Post[] = [];
  private postsSubscription: Subscription;

  constructor(public postsService: PostsService){

  }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSubscription = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
