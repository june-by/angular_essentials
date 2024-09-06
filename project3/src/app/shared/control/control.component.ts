import {
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    // "(click)" : "onClick()"
  },
})
export class ControlComponent {
  // @HostBinding() className = 'control';
  //  @HostListener()
  label = input.required<string>();
}
