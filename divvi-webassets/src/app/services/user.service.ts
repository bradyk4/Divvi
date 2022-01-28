import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const baseURL = "http://localhost:8090/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  // API response handling
  getUsers(){
    return this.http.get('http://localhost:8090/api/users');
  }

  getUserById(id: number){
    return this.http.get('http://localhost:8090/api/users/'+id);
  }

  postUser(name: string, balance: number, groupId: number){
    const body = {
      "name": name,
      "balance": balance,
      "groupId": groupId,
    }
    return this.http.post('http://localhost:8090/api/users/postUser', body)
  }

  updateUserBalance(id: number, balance: number){
    const body = { "balance": balance };
    return this.http.put('http://localhost:8090/api/users/'+id, body)
  }

  deleteUser(id: number){
    return this.http.delete('http://localhost:8090'+id);
  }
}
