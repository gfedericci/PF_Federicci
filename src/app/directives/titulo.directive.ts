import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[titulo]'
})
export class TituloDirective implements OnInit{
  @Input() titulo: string = '20';
  
  constructor(private el: ElementRef) { 
    this.ngOnInit();
  }

  ngOnInit() {
    this.el.nativeElement.style.fontSize = this.titulo + 'px';
  }

}