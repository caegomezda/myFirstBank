import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ChatService } from '../../services/chat.service';
import { FirebaseService } from '../../services/firebase.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private chatService: ChatService,
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
        (res) => {
          loading.dismiss();
          this.storage.saveIdUser(res.user.uid);
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

}
