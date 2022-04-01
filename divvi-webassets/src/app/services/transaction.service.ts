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
  postTransaction(debtorName: string, expenseName: string, expenseDesc: string, amountOwed: number, userID: number, creatorID: number, creatorName: string, isAmountPaid: boolean){
    const body = {
      "debtorName": debtorName,
      "expenseName": expenseName,
      "expenseDesc": expenseDesc,
      "amountOwed": amountOwed,
      "userID": userID,
      "creatorID": creatorID,
      "creatorName": creatorName,
      "isAmountPaid": isAmountPaid
    }
    return this.http.post('http://localhost:8090/api/transactions/post', body)
  }
<<<<<<< HEAD

  deleteTransaction(id: number){
    return this.http.delete('http://localhost:8090/api/transactions/'+id);
  }
=======
>>>>>>> origin
}
