import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.css'],
})
export class InputAddressComponent implements OnInit {
  requestedAddress!: string;
  balance!: string;
  symbol!: string;
  constructor(private dservice: DataService) {
    this.balance = '0';
    this.symbol = dservice.getSymbol();
  }
  ngOnInit(): void {}

  async getAddress(address: string) {
    if (ethers.utils.isAddress(address)) {
      this.requestedAddress = address;
      await this.getBalance();
      this.active_balance();
      this.dservice.setReceiverAddress(address);
    } else {
      console.log('Invalid address');
      this.active_invalid();
    }
  }
  async getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      let httpProvider = new ethers.providers.JsonRpcProvider(
        this.dservice.getProvider()
      );
      const erc20 = new ethers.Contract(
        this.dservice.getContractAddress(),
        this.dservice.getABI(),
        httpProvider
      );
      this.symbol = await erc20['symbol']();
      this.dservice.setSymbol(this.symbol);
      let balance = await erc20['balanceOf'](this.requestedAddress);
      this.balance = ethers.utils.formatEther(balance);
    } else {
      console.log('MetaMask not installed!');
    }
  }
  active_balance() {
    var x = document.getElementById('receiver_balance');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('invalid');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
  active_invalid() {
    var x = document.getElementById('invalid');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('receiver_balance');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
}
