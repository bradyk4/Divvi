import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http : HttpClient) { }

  getTransactions(){
    return this.http.get('http://localhost:8090/api/transactions/');
  }
  getTransaction(id: number){
    return this.http.get('http://localhost:8090/api/transactions/'+id)
  }
  postTransaction(userName: string, expenseName: string, expenseDesc: string, amountOwed: number, userID: number, transactionID: number, creatorID: number, isAmountPaid: boolean){
    const body = {
      "userName": userName,
      "expenseName": expenseName,
      "expenseDesc": expenseDesc,
      "amountOwed": amountOwed,
      "userID": userID,
      "transactionID": transactionID,
      "creatorID": creatorID,
      "isAmountPaid": isAmountPaid

    }
    return this.http.post('http://localhost:8090/api/transactions/post', body)
  }
}
