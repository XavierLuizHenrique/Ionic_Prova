import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import firebase from 'firebase';
import { Produto } from '../../model/produto';


@IonicPage()
@Component({
  selector: 'page-produto-visualiza',
  templateUrl: 'produto-visualiza.html',
})
export class ProdutoVisualizaPage {

  formGroup : FormGroup;
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots : true};
  produto = new Produto();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder : FormBuilder) {

                this.firestore.settings(this.settings);

                this.produto = this.navParams.get('produto');

                this.formGroup = this.formBuilder.group({
                  nomeProduto : [this.produto.nomeProduto],
                  preco : [this.produto.preco],
                  categoria : [this.produto.categoria],
                  descricao : [this.produto.descricao],
              })
            }

  atualizar(){
    let ref =this.firestore.collection('produto')
    ref.doc(this.produto.id).set(this.formGroup.value)
      .then(() =>{
      console.log('Atualizada com sucesso');
      this.navCtrl.push('ListaProdutoPage');
    }).catch(()=>{
      console.log('Erro ao atualizar');
    })
  }

} 
