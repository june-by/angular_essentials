import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true,
})
export class TemparaturPipe implements PipeTransform {
  transform(
    value: string | number,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ) {
    const val = typeof value === 'string' ? parseFloat(value) : value;

    let outputTemp: number;
    if (inputType === 'cel' && outputType === 'cel') {
      outputTemp = val * (9 / 5) + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = (val - 32) * (5 / 9);
    } else {
      outputTemp = val;
    }

    let symbol: 'C' | 'F';

    if (!outputType) {
      symbol = inputType === 'cel' ? 'C' : 'F';
    } else {
      symbol = outputType === 'cel' ? 'C' : 'F';
    }
    return `${outputTemp} ${symbol}`;
  }
}
