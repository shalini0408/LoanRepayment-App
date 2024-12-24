import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { Savingspayment } from 'src/app/model/savingspayment';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SavingshistoryService } from 'src/app/services/savingshistory/savingshistory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-savingshistory',
  templateUrl: './savingshistory.component.html',
  styleUrls: ['./savingshistory.component.css']
})
export class SavingshistoryComponent implements OnInit {

  final:Savingspayment[]=[]
  // currentloggedinuser?:number;
  currentloggedinuser:any;
  fileName = 'ExcelSheet.xlsx';
exportexcel(): void {
  /* pass here the table id */
  let element = document.getElementById('excel_table');
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, this.fileName);

}
constructor(private routingservice: RoutingService,private savingshistory:SavingshistoryService) {
  this.currentloggedinuser=this.routingservice.getLoggedInUser();
  
 }

ngOnInit(): void {
  if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload') 
    location.reload() 
  } else {
    localStorage.removeItem('foo') 
  }
  console.log(this.currentloggedinuser)
  this.savingshistory.fetchpayments(this.currentloggedinuser).subscribe(res => {
    console.log("resulttttt"+res);
    res.filter((obj: Savingspayment)=>{
      if(obj.custid==this.currentloggedinuser){
        
        this.final.push(obj);
        console.log("Dateee"+new Date());
        
      } 
    })
    this.final.sort((obj2, obj1) => {
      return obj2.transaction_no-obj1.transaction_no;
  }).reverse();
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.routingservice.accessLogin();
      
    });
  
}


}
