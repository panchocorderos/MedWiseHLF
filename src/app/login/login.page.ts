import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ApiService } from '../services/api/api.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginAlert: boolean = false;
  loginForm: FormGroup;
  route: Router = inject(Router);

  constructor(public form: FormBuilder, private api: ApiService) {
    this.loginForm = this.form.group({
      run: ['', Validators.required],
    });
  }

  ngOnInit() {}

  setOpen(trigger: boolean) {
    this.loginAlert = trigger;
  }

  onLogin() {
    if (this.loginForm.valid) {
      let form = this.loginForm.value;
      this.api.getUserData(form).subscribe(
        (data) => {
          if (data.total === 0) {
            throw new Error ('No se encontró el usuario');
          }

          this.route.navigate(['/portal', data.entry[0].resource.id]);
        },
        (error) => {
          console.log(error)
          this.loginAlert = true;
        }
      );
    }
  }
}
