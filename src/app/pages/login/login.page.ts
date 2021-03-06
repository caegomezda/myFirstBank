import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialForm: FormGroup;
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';

  constructor(private fb: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private firebaseService : FirebaseService,
              private storage : StorageService
  ) {}

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async signUp() {
    this.router.navigateByUrl('/sign-up', { replaceUrl: true });
  }
 
  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();
      this.firebaseService.signIn(this.credentialForm.value).then(
        async (res) => {
          if(res.user.emailVerified) {
            loading.dismiss();
            console.log('res.user',res.user);
            await this.storage.saveIdUser(res.user.uid);
            await this.storage.saveTokenUser(res.user.getIdToken())
            this.router.navigateByUrl('/home', { replaceUrl: true });
         } else {
          loading.dismiss();
          console.log("No se ha verificado la cuenta");
          const alert = await this.alertController.create({
            header: 'Cuenta no verificada',
            message: "No se ha verificado la cuenta revise su correo o contacte a soporte",
            buttons: ['OK'],
          });
          await alert.present();
         }
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: ':(',
            message: err.message,
            buttons: ['OK'],
          });
          
          await alert.present();
        }
      );
  }
 
  // Easy access for form fields
  get email() {
    return this.credentialForm.get('email');
  }
  
  get password() {
    return this.credentialForm.get('password');
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
        nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

}
