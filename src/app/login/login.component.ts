import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageContstants } from '../core/common/message.constants';
import { UrlConstants } from '../core/common/url.constants';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  loading = false;
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),

    });
  }
  onSubmit() {
    this.loading = true;
    this.authenService.login(this.LoginForm.controls['username'].value, this.LoginForm.controls['password'].value)
    .then(data => {
      this.router.navigate([UrlConstants.HOME]);
    }).catch(error=>{
      this.notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }
}
