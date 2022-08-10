import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css'],
})
export class ConnectWalletComponent implements OnInit {
  button_status!: string;
  balance!: string;
  symbol!: string;
  contract!: any;
  signerAddress!: string;
  constructor(private dservice: DataService) {
    this.button_status = 'Connect';
    this.balance = '0';
    this.symbol = dservice.getSymbol();
  }

  ngOnInit(): void {}

  async connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      console.log(window.ethereum);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      this.button_status = 'Connected';
      const signerAddress = await provider.getSigner().getAddress();
      this.signerAddress = signerAddress;
      await this.getBalance(signerAddress);
      this.active_balance();
    } else {
      console.log('MetaMask not installed!');
      this.active_metamask();
    }
  }
  async getBalance(signerAddress: string) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //erc20 contract
      const erc20 = new ethers.Contract(
        this.dservice.getContractAddress(),
        this.dservice.getABI(),
        provider
      );
      this.contract = erc20;
      this.symbol = await erc20['symbol']();
      this.dservice.setSymbol(this.symbol);
      //balance of wallet owner
      let balance = await erc20['balanceOf'](signerAddress);
      this.balance = ethers.utils.formatEther(balance);
      this.dservice.setSenderBalance(this.balance.toString());
    } else {
      console.log('MetaMask not installed!');
    }
  }
  active_balance() {
    var x = document.getElementById('balance');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('metamask');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
  active_metamask() {
    var x = document.getElementById('metamask');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('balance');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
}
declare global {
  interface Window {
    ethereum: any;
  }
}
