import { Component, ElementRef, output, viewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form = viewChild<ElementRef<HTMLFormElement>>('form');
  // @ViewChildren(ButtonComponent) buttons;

  add = output<Pick<Ticket, 'title' | 'request'>>();
  input = {
    title: '',
    request: '',
  };

  onSubmit() {
    this.add.emit({ ...this.input });
    this.input = {
      title: '',
      request: '',
    };
  }
}
