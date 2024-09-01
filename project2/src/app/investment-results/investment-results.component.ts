import { Component, computed } from '@angular/core';
import { InvestmentResultsService } from './investment-results.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  constructor(private investmentResultsService: InvestmentResultsService) {}

  annualDataList = computed(() => this.investmentResultsService.annualData());
}
