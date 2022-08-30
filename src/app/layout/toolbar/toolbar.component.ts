import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/state/usuarios/usuarios.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private store: Store) { }
  user$ = this.store.select(getUser);

  ngOnInit(): void {
  }

}
