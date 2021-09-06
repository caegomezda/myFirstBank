import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  credentialForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private firebaseService : FirebaseService
  ) {}

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async signUp() {
    let password = this.credentialForm.value.password
    let password2 = this.credentialForm.value.password2
    if (password === password2) {
      const loading = await this.loadingController.create();
      await loading.present();
      this.firebaseService.signup(this.credentialForm.value).then(
          (user) => {
            loading.dismiss();
            console.log('user',user);
            this.router.navigateByUrl('/login', { replaceUrl: true });
          },
          async (err) => {
            loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Sign up failed',
              message: err.message,
              buttons: ['OK'],
            });
   
            await alert.present();
          }
        );
    }else{
      const alert = await this.alertController.create({
        header: 'Sign up failed',
        message: "The password are not equal",
        buttons: ['OK'],
      });

      await alert.present();
    }

  }
 
  // Easy access for form fields
  get email() {
    return this.credentialForm.get('email');
  }
  
  get password() {
    return this.credentialForm.get('password');
  }

  get password2() {
    return this.credentialForm.get('password2');
  }

}
