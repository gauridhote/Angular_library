import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserDetails } from '../user-details';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  csers:UserDetails[]=[];
  Book_Title:any;
  p:number = 1;
  currentUser: User;
  userFromApi: User;
  loading = false;
  constructor(public rs: DataService,private userService: UserService,
    private authenticationService: AuthenticationService) {
      this.currentUser = this.authenticationService.currentUserValue;
     }
  
  ngOnInit(): void {
    this.rs.getUsers().subscribe((response)=>{
      this.csers=response;
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

  getmethod(){
    window.alert("Your Book is Added");
  }

  returnmethod(){
    window.alert("Your Book is Returned");
  }
  }
//   books: UserDetails[] = [];
//   bookName = "";

//     constructor(private bookService: DataService) { }
//     getBooks(): void {
//         this.bookService.getBooks().then(books => {
//           console.log("hi "+ books.length);
//           this.books = books;
//         });
//     }
//     ngOnInit(): void {
//         this.getBooks();
//     }			

// }
