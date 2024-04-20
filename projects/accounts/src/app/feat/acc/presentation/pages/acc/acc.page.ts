import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'acc-acc-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './acc.page.html',
  styleUrl: './acc.page.scss'
})
export class AccPage {

}
