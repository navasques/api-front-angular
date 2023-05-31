import { Component } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  btnCadastro: boolean = true;

  constructor(private servico: ClienteService) {  }

  clientes: Cliente[] =  [];

  listar():void {
    this.servico.listar().subscribe(retorno => this.clientes = retorno);
  }

  ngOnInit() {
    this.listar();
  }
}
