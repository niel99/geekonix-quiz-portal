import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map'
import { LocalStorageService } from './localStorage.service';

import { environment } from '../../environments/environment';


@Injectable()
export class QuesService {

  constructor(private http: Http,
            private localStorageService: LocalStorageService){
  }

  getAllQues(quizId){
      const headers = new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.get(environment.apiUrl + 'ques/'+quizId, {headers: headers}).map(res => res.json());
  }

  getQues(id){
      const headers = new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.get(environment.apiUrl + 'ques/viewQues/'+id, {headers: headers}).map(res => res.json());
  }

  /*submitFlag(id, flag){
      const headers = new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.post(environment.apiUrl + 'chals/'+id, {flag: flag}, {headers: headers}).map(res => res.json());
  }*///api not ready.. submitAll()
  saveSol(id,sol){
    const headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(environment.apiUrl + 'ques/saveAns', {'queId':id,'ans':sol}, {headers: headers}).map(res => res.json());
  
  }
  getCurrDate(){
    const headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(environment.apiUrl + 'ques/syncDate', {headers: headers}).map(res => res.json());

  }
  clearSol(id){
    const headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(environment.apiUrl + 'ques/clearAns', {'queId':id}, {headers: headers}).map(res => res.json());
  
  }
  addQue(que){
      const headers = new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.post(environment.apiUrl+'ques/add', que, {headers: headers}).map(res => res.json());
  }

  viewSol(id){
      const headers = new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.get(environment.apiUrl+'ques/viewSol/'+id, {headers: headers}).map(res => res.json());
  }

  deleteQue(id){
      const headers = new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.delete(environment.apiUrl+'ques/'+id, {headers: headers}).map(res => res.json());
  }

  submitSol(userId,quizId){
    let sol = this.localStorageService.getSubmissions(userId,quizId);
    const headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(environment.apiUrl+'ques/submitSol',{'quizId':quizId,'sol':sol}, {headers: headers}).map(res => res.json());
  }

  getRanklist(){
      const headers = new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.get(environment.apiUrl + 'ques/bughuntRanklist', {headers: headers}).map(res => res.json());
  }

}
