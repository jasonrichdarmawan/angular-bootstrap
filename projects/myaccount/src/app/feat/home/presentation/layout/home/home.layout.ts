import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'my-acc-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.layout.html',
  styleUrl: './home.layout.scss'
})
export class HomeLayout {

}
