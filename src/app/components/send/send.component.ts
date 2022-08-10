import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
  constructor(private dservice: DataService) {}
  ngOnInit(): void {}

  tx: any;
  async Send() {
    var signer;
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
    }

    const erc20 = new ethers.Contract(
      this.dservice.getContractAddress(),
      this.dservice.getABI(),
      signer
    );

    // const transactionResponse = await Etherscam['SendToAddress'](
    //   ethers.utils.getAddress(this.dservice.getAddress()),
    //   { value: ethers.utils.parseEther(this.dservice.getEthAmount()) }
    // );

    const transactionResponse = await erc20['transfer'](
      this.dservice.getReceiverAddress(),
      ethers.utils.parseEther(this.dservice.getEthAmount())
    );

    this.tx = transactionResponse['hash'];

    var x = document.getElementById('tx');
    if (x?.style.display == 'none') x.style.display = 'block';

    const transactionReceipt = await transactionResponse.wait(1);
    if (x?.style.display == 'block') x.style.display = 'none';
    const link = document.getElementById('link') as HTMLAnchorElement | null;
    if (link !== null) {
      link.href = 'https://ropsten.etherscan.io/tx/' + this.tx;
      console.log(link.href);
    }
    x = document.getElementById('success');
    if (x?.style.display == 'none') x.style.display = 'block';
  }
}
