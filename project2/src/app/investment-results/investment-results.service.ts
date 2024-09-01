import { Injectable, signal } from '@angular/core';
import { InvestmentResultsType } from './investment-results.model';
import { InvestmentInputType } from '../investment-input.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentResultsService {
  annualData = signal<InvestmentResultsType[]>([]);

  onSubmitInvestmentData({
    initialInvestment,
    annualInvestment,
    expectedReturn,
    duration,
  }: InvestmentInputType) {
    function calculateInvestmentResults() {
      const annualData = [];
      let investmentValue = initialInvestment;

      for (let i = 0; i < duration; i++) {
        const year = i + 1;
        const interestEarnedInYear = investmentValue * (expectedReturn / 100);
        investmentValue += interestEarnedInYear + annualInvestment;
        const totalInterest =
          investmentValue - annualInvestment * year - initialInvestment;
        annualData.push({
          year: year,
          interest: interestEarnedInYear,
          valueEndOfYear: investmentValue,
          annualInvestment: annualInvestment,
          totalInterest: totalInterest,
          totalAmountInvested: initialInvestment + annualInvestment * year,
        });
      }

      return annualData;
    }
    this.annualData.set(calculateInvestmentResults());
  }
}
