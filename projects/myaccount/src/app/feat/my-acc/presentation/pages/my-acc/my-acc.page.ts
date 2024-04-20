import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'my-acc-my-acc-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './my-acc.page.html',
  styleUrl: './my-acc.page.scss'
})
export class MyAccPage {

}
