import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule  } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [ MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss'
})
export class CustomInputComponent {
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isPassword!: boolean;
  hide: boolean = true;
  
  constructor() { }

  ngOnInit() {
    if(this.type == 'password') this.isPassword = true;
  }

  showOrHidePassword(event: Event){
    event?.preventDefault();
    this.hide = !this.hide;
    if(this.hide){
      this.type = 'password';
    }else{
      this.type = 'text';
    }
  }
}
