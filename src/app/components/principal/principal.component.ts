import { Component } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  cliente = new Cliente();

  btnCadastro: boolean = true;

  tabela: boolean = true;

  constructor(private servico: ClienteService) {}

  clientes: Cliente[] = [];

  listar(): void {
    this.servico.listar().subscribe((retorno) => (this.clientes = retorno));
  }

  cadastrar(): void {
    this.servico.cadastrar(this.cliente)
    .subscribe((retorno) => {

      this.clientes.push(retorno);

      this.cliente = new Cliente();

      alert('Cliente cadastrado com sucesso!');
    });
  }

  selecionarCliente(posicao: number): void {
    this.cliente = this.clientes[posicao];
    this.btnCadastro = false;
    this.tabela = false;
  }

  editar(): void {
    this.servico.editar(this.cliente)
    .subscribe(retorno => {

      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == retorno.codigo;
      });

      this.clientes[posicao] = retorno;

      this.cliente = new Cliente();

      this.btnCadastro = true;
      this.tabela = true;

      alert('Cliente alterado com sucesso!');
    })
  }

  excluir(): void {

    this.servico.excluir(this.cliente.codigo)
    .subscribe(retorno => {

      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == this.cliente.codigo;
      });

      this.clientes.splice(posicao, 1);

      this.cliente = new Cliente();
      this.btnCadastro = true;
      this.tabela = true;

      alert('Cliente excluído com sucesso!');
    })
  }

  cancelar():void {
    this.cliente = new Cliente();

    this.btnCadastro = true;

    this.tabela = true;
  }

  ngOnInit() {
    this.listar();
  }
}
