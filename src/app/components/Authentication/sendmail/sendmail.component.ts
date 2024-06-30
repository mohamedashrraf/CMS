import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';


export interface CardData {
  state: "default" | "flipped" | "matched";
}


@Component({
  selector: 'app-sendmail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, SpinnerComponent],
  templateUrl: './sendmail.component.html',
  styleUrl: './sendmail.component.css',
  // animations: [
  //   trigger('flipInOut', [
  //     transition(':enter', [
  //       animate('0.5s', style({ transform: 'rotateY(90deg)' })),
  //     ]),
  //     transition(':leave', [
  //       animate('0.5s', style({ transform: 'rotateY(180deg)' })),
  //     ]),
  //   ]),
  // ],
  animations: [
    trigger("cardFlip", [
      state(
        "*",
        style({
          transform: "rotateY(270deg)"
        })
      ),
      state(
        "flipped",
        style({
          transform: "rotateY(360deg)"
        })
      ),
      transition("* <=> flipped", [animate("1000ms")]),
    ])
  ]
})
export class SendmailComponent implements OnInit {

  spinner!: Boolean;

  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private _Router: Router) { }


  ngOnInit(): void {
    this.spinner = false;
    this.formSendMail = this.formBuilder.group({
      forgetEmail: ['', [Validators.required, Validators.email]],
    });

  }

  formSendMail = new FormGroup({
    forgetEmail: new FormControl(''),
  });


  resetSubmit() { // send mail
    this.spinner = true;

    if (this.formSendMail.invalid) {
      this.spinner = false;
      console.log(this.formSendMail);
      return;
    }
    const email = this.formSendMail.controls.forgetEmail.value?.toString() ?? '';
    this._authService.sendMail(email).subscribe({
      next: (res) => {
        // sessionStorage.setItem('token' , res.token);
        this.spinner = false;

        sessionStorage.setItem('email', email);
        sessionStorage.setItem('message', res.message);
        console.log(res);
        this._Router.navigateByUrl('/auth/emailverification');
      }, error: (err) => {
        this.spinner = false;

        console.log(err);
      }
    })
    // this._authService.sendMail(email).subscribe({
    //   next: (res)=>{
    //     sessionStorage.setItem('token' , res.token);
    //     sessionStorage.setItem('email' , res.email);
    //     sessionStorage.setItem('message',res.message);
    //     console.log(this.formSendMail.controls.forgetEmail.value);

    //     console.log(res.message);
    //     console.log(res.token)
    //     console.log(res);

    //     this._Router.navigateByUrl('/emailverification');
    // },
    //   error:(err)=>{alert(err.message)}
    // });
  }

}
