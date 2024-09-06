import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket.model';
import { TicketComponent } from './ticket/ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onAdd({ title, request }: Pick<Ticket, 'title' | 'request'>) {
    const newTicket: Ticket = {
      title,
      request,
      id: Math.random().toString(),
      status: 'open',
    };
    this.tickets.push(newTicket);
  }

  onCloseTicket({ id }: Pick<Ticket, 'id'>) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id) {
        return {
          ...ticket,
          status: 'closed',
        };
      } else {
        return ticket;
      }
    });
  }
}
