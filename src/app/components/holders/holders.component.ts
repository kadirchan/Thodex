import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ethers } from 'ethers';
@Component({
  selector: 'app-holders',
  templateUrl: './holders.component.html',
  styleUrls: ['./holders.component.css'],
})
export class HoldersComponent implements OnInit {
  holders!: Array<string>;
  constructor(private dservice: DataService) {}

  ngOnInit(): void {}
  async getHolders() {
    let contractEvent = await this.dservice
      .getContract()
      .on('Transfer', (to: any, amount: any, from: any) => {
        this.holders.push(to);
      });
  }
}
