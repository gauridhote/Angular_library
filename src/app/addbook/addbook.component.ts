import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ufetch } from '../ufetch';
import { UserDetails } from '../user-details';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {

  constructor(public route:ActivatedRoute,public router:Router,public rs:DataService) { }
 
  val:any;
  users: UserDetails[]=[];
  user:Ufetch;
  ngOnInit(): void {
    let sub=this.route.params.subscribe(params=>{
      this.val=params['id'];
    });
    console.log("id: "+this.val);
    this.rs.getUpdateUser(this.val).subscribe(data=>{
    this.user=data;
    })
  }
 
  add(){
    this.rs.createUser(this.user).subscribe(data=>{
    });
    this.getUsers();
    this.router.navigate(['admin']);
  }
  getUsers(){
    this.rs.getUsers().subscribe((response)=>{
      this.users=response;
    });
  }
}
