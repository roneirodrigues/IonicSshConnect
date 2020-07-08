import { Component } from '@angular/core';
import { SSHConnect } from '@ionic-native/ssh-connect/ngx';
import { kMaxLength } from 'buffer';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  detalhes = [];
  data = {
    inputUser: '',
    inputPassword: '',
    inputServer: '',
    inputCommand: ''
  };

  history = [];
  nameOptions;

  constructor(
    private sshConnect: SSHConnect
  ) {



  }



  async onClick() {



    const varx =
      `"102|000001|00000001|00000002|00000000|000000000000000000|000000000000580923|000000000000580923|0000000016585|0000000000000|0000000002500|0000000000000|0000000561838|20200512|00000001"`;

    this.history.unshift({ detalhe: this.data.inputCommand });


    this.detalhes = [];

    this.detalhes.push({ det: 'Connecting . . .' });

    const connected =
      await this.sshConnect.connect(this.data.inputUser, this.data.inputPassword, this.data.inputServer, 22).catch(error => {

        this.detalhes.push({ det: 'Error: ' + error });

        console.error(error);
      });;

    if (connected) {

      console.log('cccc', this.data.inputCommand + varx + '> myfile.txt');
      this.sshConnect.executeCommand(this.data.inputCommand + varx + '> myfile.txt')
        .then(async resp => {
          this.detalhes.push({ det: 'File copied . . .' });


          console.log('Conectado');
          console.log(resp);
          const b = await this.detalhes.push({ det: 'Return: ' + resp });

        })
        .catch(error => {
          console.log('Error::::');
          this.detalhes.push({ det: 'Error: ' + error });

          console.error(error);
        });

      const dis = this.sshConnect.disconnect().then(async resp => {
        const a = await this.detalhes.push({ det: 'Diconnected . . .' });


      });

      /*
            setTimeout(() => {
              this.sshConnect.disconnect();
              this.detalhes.push({ det: 'Diconnected . . .' });
            }, 3000);
            */


    }
  }
  historyF(item) {
    this.data.inputCommand = item.detail.value.detalhe;
    console.log('itemitem', item.detail.value.detalhe);
    this.nameOptions = null;
  }

  onClickClear() {
    this.data = {
      inputUser: '',
      inputPassword: '',
      inputServer: '',
      inputCommand: ''
    };
    this.detalhes = [];

  }

  openSeach() {
    console.log('Seachring...',);
  }
}
