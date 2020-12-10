import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ufetch } from '../ufetch';
import { UserDetails } from '../user-details';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers= new HttpHeaders().set('Content-Type','application/json')
  .set('Accept','application/json');
httpOptions={
headers:this.headers
}
  constructor(private http:HttpClient) { }

  url:string="http://localhost:4100/UserDetails";

  getUsers(){

    return this.http.get<UserDetails[]>(this.url);
  }
  
  
  createUser(user: UserDetails) {
    return this.http.post(this.url, user);
  }

  getUpdateUser(id:number):Observable<UserDetails>{
    return this.http.get<UserDetails>(this.url + '/' + id,this.httpOptions);
  }
 
  updateUser(user:Ufetch):Observable<UserDetails>{
    //const url='${this.url}/${user.id}';
    return this.http.put<UserDetails>(this.url + '/' + user.id ,user,this.httpOptions).pipe(
      map(() => user)
    );
  }
 

 
  deleteUser(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  getDetails() {
    return this.http.get<UserDetails[]>(this.url);
 }
}



  
