import { Component } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  cliente = new Cliente();

  btnCadastro: boolean = true;

  constructor(private servico: ClienteService) {  }

  clientes: Cliente[] =  [];

  listar():void {
    this.servico.listar().subscribe(retorno => this.clientes = retorno);
  }

  cadastrar():void {
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {
      this.clientes.push(retorno);

      this.cliente = new Cliente();
      alert('Cliente cadastrado com sucesso!');
    });
  }

  ngOnInit() {
    this.listar();
  }
}
