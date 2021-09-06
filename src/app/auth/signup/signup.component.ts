import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authSatusSub: Subscription;
  constructor(public authService: AuthService) { };

  ngOnInit() {
    this.authSatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });

    const gender = document.getElementById("register__info-gender").addEventListener('click', () => {
      const gender2 = document.getElementById("register__info-gender-menu");
      if (gender2.style.display == 'block') { gender2.style.display = 'none' } else { gender2.style.display = 'block' }
    })
    document.getElementById("register__info-gender-item-1").addEventListener('click', () => {
      document.getElementById("register__info-gender-choose").innerText = "Nam";
    })
    document.getElementById("register__info-gender-item-2").addEventListener('click', () => {
      document.getElementById("register__info-gender-choose").innerText = "Nữ";
    })
    document.getElementById("register__info-gender-item-3").addEventListener('click', () => {
      document.getElementById("register__info-gender-choose").innerText = "Khác";
    })

    const type = document.getElementById("register__info-type").addEventListener('click', () => {
      const type2 = document.getElementById("register__info-type-menu");
      if (type2.style.display == 'block') { type2.style.display = 'none' } else { type2.style.display = 'block' }
    })
    document.getElementById("register__info-type-item-1").addEventListener('click', () => {
      document.getElementById("register__info-type-choose").innerText = "Người dùng cá nhân";
      document.getElementById("register__info-phone--btn").style.display = "none";
      document.getElementById("register__info-gender").style.display = "block";
      document.getElementById("register__info-confirm").style.display = "none";
    })
    document.getElementById("register__info-type-item-2").addEventListener('click', () => {
      document.getElementById("register__info-type-choose").innerText = "Doanh nghiệp vận chuyển";
      document.getElementById("register__info-phone--btn").style.display = "block";
      document.getElementById("register__info-gender").style.display = "none";
      document.getElementById("register__info-confirm").style.display = "block";
    })
    document.getElementById("register__button-continue").addEventListener('click', () => {
      document.getElementById("register__left").style.display = "none";
      document.getElementById("register__confirm").style.display = "flex";
    })
    document.getElementById("register__button-continue--confirm").addEventListener('click', () => {
      document.getElementById("register__confirm").style.display = "none";
      document.getElementById("register__info").style.display = "flex";
    })
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authSatusSub.unsubscribe();
  }

  showSelectValue = function (mySelect) {
    console.log(mySelect);
  }

  showHide(type) {
    if (type == 1) {
      alert("Nguoi dung")
    } else {
      alert("Doanh nghiep")
    }
  }
}
