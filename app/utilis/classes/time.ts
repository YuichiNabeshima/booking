import { TimePointValue } from './overlap/overlap';

export class Time {
  protected time = 0;
  protected hour = 0;
  protected min  = 0;

  constructor(str: string) {
    this.hour = Number(str.split(':')[0]);
    this.min = Number(str.split(':')[1]);
    return this;
  }

  display(): TimePointValue {
    return `${this.hour}:${('00' + this.min).slice(-2)}` as TimePointValue;
  }

  add(str: string) {
    let carryUp = false;

    let min = this.min + Number(str.split(':')[1]);

    if (min >= 60) {
      carryUp = true;
      min -= 60;
    }

    let hour = this.hour + Number(str.split(':')[0]);

    if (carryUp) {
      hour += 1;
    }

    if (hour >= 24) {
      hour -+ 24;
    }

    this.hour = hour;
    this.min = min;
    return this;
  }

  sub(str: string) {
    let carryDown = false;

    let min = this.min - Number(str.split(':')[1]);

    if (min < 0) {
      carryDown = true;
      min += 60;
    }

    let hour = this.hour - Number(str.split(':')[0]);

    if (carryDown) {
      hour -= 1;
    }

    if (hour < 0) {
      hour += 24;
    }

    this.hour = hour;
    this.min = min;
    return this;
  }

  isValidTime(hourMin = 11, hourMax = 23) {
    if ( (hourMin <= this.hour && this.hour < hourMax) && ( 0 <= this.min && this.min < 60)) {
      return true;
    }
    return false;
  }
}
