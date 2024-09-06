import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  data = input.required<Ticket>();
  close = output<Pick<Ticket, 'id'>>();
  detailsVisible = signal(false);

  onToggleDetails() {
    this.detailsVisible.update((prev) => !prev);
  }

  onMarkAsCompleted() {
    this.close.emit({ id: this.data().id });
  }
}
