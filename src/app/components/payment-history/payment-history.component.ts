import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
import { RoutingService } from 'src/app/services/routing.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  final:Payment[]=[]
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
constructor(private routingservice: RoutingService,private paymentservice:PaymentService) {
 }

ngOnInit(): void {
  if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload') 
    location.reload() 
  } else {
    localStorage.removeItem('foo') 
  }
  this.paymentservice.fetchpayments().subscribe(res => {
    this.currentloggedinuser=this.routingservice.getLoggedInUser();
    console.log(this.currentloggedinuser);
    res.filter((obj: Payment)=>{
      if(obj.custid==this.currentloggedinuser){
        console.log("inside cond"+true);
        this.final.push(obj);
      } 
    })
    this.final.sort((obj2, obj1) => {
      var das=new Date(obj2.time_payment_atempted).getTime()-new Date(obj1.time_payment_atempted).getTime() ;
      console.log(das);
      
      return das ;
  }).reverse()
  console.log(this.final);
  
  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.routingservice.accessLogin();
    
  });
  
}

}

