import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserDetails } from '../user-details';

import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';
import { DataService } from '../_services/data.service';

@Component({ templateUrl: 'admin.component.html',
styleUrls: ['admin.component.css'] })

export class AdminComponent implements OnInit {
    loading = false;
    csers:UserDetails[]=[];
    id:any;
    Book_Title:any;
    Book_Author:any;
    Book_Count:any;
    currentUser: User;
    userFromApi: User;
    
    p:number = 1;
    constructor(public rs: DataService,private router:Router,private userService: UserService,
        private authenticationService: AuthenticationService) { 
        this.currentUser = this.authenticationService.currentUserValue;
    }
    
    ngOnInit(): void {
      this.rs.getUsers().subscribe((response)=>{
        this.csers=response;
      });
      this.rs.getDetails().subscribe(data => {
        console.log(data);
        this.csers=data;
       });
       this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
        this.loading = false;
        this.userFromApi = user;
    });
    }
    Search(){
      if(this.Book_Title == "")
      {
        this.ngOnInit();
      }else{
        this.csers =this.csers.filter(res =>{
          return res.Book_Title.toLocaleLowerCase().match(this.Book_Title.toLocaleLowerCase());
        })
      }
    }
  
    deleteRow(val){
      if(confirm("Are you sure want to delete?")){
      this.rs.deleteUser(val).subscribe(data =>{
      });
      this.rs.getUsers().subscribe((response) => {
        this.csers = response;
      })}
    }
   
    update(id){
      this.router.navigate(['/update',id]);
    }
    add(user){
      this.router.navigate(['/addbook',user]);
    }

    getData(user):void{
        this.Book_Title = user.Book_Title;
        this.Book_Author = user.Book_Author;
        this.Book_Count = user.Book_Count;
        this.id = user.id;
       
        }

        
}