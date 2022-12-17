import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenRequest } from 'src/app/models/TokenRequest';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  get formControls() {
    return this.loginForm.controls;
  }

  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    let token: TokenRequest = {
      client_id: 'ClientApi',
      grant_type: 'password',
      scope: 'task habit',
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.token(token).subscribe({
      next: (data) => {
        this.storageService.saveToken(data);
        this.router.navigateByUrl('task-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
