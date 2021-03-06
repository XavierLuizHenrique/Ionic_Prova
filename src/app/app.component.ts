import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform,
     public statusBar: StatusBar,
      public splashScreen: SplashScreen,
        public firebaseauth : AngularFireAuth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Produto', component: 'ProdutoPage'},
      { title: 'Lista de Produto', component: 'ListaProdutoPage'},
      { title: 'Livros', component: 'LivrosPage'},
      { title: 'Lista de Livros', component: 'ListaLivrosPage'},
      { title: 'Logoff', component: 'LogoffPage'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.firebaseauth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = 'InicioPage'; //Página inicial quando estiver logado
          } else {
            this.rootPage = 'HomePage'; // se não houver usuário
           }
      },
      () => {
        this.rootPage = 'InicioPage';
      }
    );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
