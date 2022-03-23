import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';



const baseURL = "http://localhost:8090/";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http : HttpClient) { }

  getGroups(){
    return this.http.get('http://localhost:8090/api/groups');
  }

  getGroup(id: number){
    return this.http.get('http://localhost:8090/api/groups/'+id)
  }

  getGroupUsers(id: number){
    return this.http.get('http://localhost:8090/api/groups/users/' + id);
  }

  postGroup(name: string, number: number){
    const body = {
      "name": name,
      "number": number
    }
    return this.http.post('http://localhost:8090/api/groups/postGroup', body);
  }

  updateGroupName(id: number, name: string){
    const body = { "name": name };
    return this.http.put('http://localhost:8090/api/groups/'+id, body);
  }

  deleteGroup(id: number){
    return this.http.delete('http://localhost:8090/api/groups/'+id);
  }
}
