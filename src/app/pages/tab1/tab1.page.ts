import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  habilitar = true;

  constructor(private postsService: PostsService) {}
  
  ngOnInit(){
    this.siguientes();

    this.postsService.nuevopost.subscribe(post =>{
      this.posts.unshift(post);//PAra cargar el nuevo post en tabs1
      
    });
    
  }
  recargar(event){
    this.siguientes (event, true);
    this.habilitar = true;
    this.posts = []; //Iiniciaalizamos el arreglo a vacio para que empiece de nuevo  
  }
  siguientes( event?, pull: boolean = false ){

    

    this.postsService.getPosts(pull).subscribe(resp =>{
      console.log(resp);
      this.posts.push(...resp.post)

      if (event){
        event.target.complete();

        if (resp.post.length === 0) {
          this.habilitar = false;
        }
        
      }
    })
  }
}
