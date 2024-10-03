import {
  Component,
  DestroyRef,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destoryRef = inject(DestroyRef);
  clickCount = signal(0);

  num = signal(0);

  constructor() {
    effect(() => {
      console.log('clickCount : ', this.clickCount());
    });
  }

  ngOnInit(): void {
    // const subscription = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => this.num.set(val),
    //     // error :
    //   });
    // this.destoryRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  onClick() {
    this.clickCount.update((prev) => prev + 1);
  }
}
