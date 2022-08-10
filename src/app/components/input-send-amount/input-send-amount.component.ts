import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-input-send-amount',
  templateUrl: './input-send-amount.component.html',
  styleUrls: ['./input-send-amount.component.css'],
})
export class InputSendAmountComponent implements OnInit {
  constructor(private dservice: DataService) {}
  ngOnInit(): void {}

  getAmount(ethAmount: string) {
    console.log(ethAmount);
    console.log(this.dservice.getSenderBalance());

    if (Number(ethAmount) <= Number(this.dservice.getSenderBalance())) {
      this.dservice.setEthAmount(ethAmount);
      var x = document.getElementById('insufficient');
      if (x?.style.display == 'block') x.style.display = 'none';
    } else {
      var x = document.getElementById('insufficient');
      if (x?.style.display == 'none') x.style.display = 'block';
    }
  }
}
