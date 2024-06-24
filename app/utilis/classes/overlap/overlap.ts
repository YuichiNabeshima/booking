import { BOOKING_TYPE } from '~/models/booking';
import type { BookingCapacity, BookingType } from '~/models/booking_capacity';
import { KEY_OF_CAPACITY } from '~/routes/_web.booking_.$clientId.scheduleApi/const';
import { timePointArray } from './const';

export type TimePointValue = typeof timePointArray[number];

export type BookingDetail = {
  isStartPoint: boolean;
  numberOfPeople: number;
};

export type BookingInfo = {
  capacity: number;
  numberOfPeople: number;
  remain: number;
  bookings: BookingDetail[];
};

export type TimePoint = { [key in TimePointValue]: BookingInfo };

export class Overlap {
  protected bookingType: keyof typeof BookingType = BOOKING_TYPE.SINGLE;
  protected timePoint: TimePoint = {
    '11:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '11:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '11:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '11:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '12:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '12:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '12:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '12:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '13:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '13:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '13:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '13:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '14:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '14:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '14:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '14:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '15:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '15:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '15:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '15:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '16:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '16:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '16:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '16:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '17:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '17:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '17:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '17:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '18:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '18:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '18:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '18:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '19:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '19:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '19:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '19:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '20:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '20:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '20:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '20:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '21:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '21:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '21:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '21:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '22:00': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '22:15': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '22:30': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
    '22:45': {
      capacity: 0,
      numberOfPeople: 0,
      remain: 0,
      bookings: [],
    },
  };

  add(range: {start: TimePointValue, end: TimePointValue, numberOfPeople: number}[], bookingType: keyof typeof BOOKING_TYPE = BOOKING_TYPE.SINGLE) {
    this.bookingType = bookingType;

    range.forEach(async time => {

      Object.keys(this.timePoint).forEach(key => {
        if ( Number(time.start.replace(':', '')) <= Number(key.replace(':', '')) && Number(key.replace(':', '')) < Number(time.end.replace(':', '')) ) {
          const bookings = {
            isStartPoint: time.start === key,
            numberOfPeople: time.numberOfPeople,
          };

          const num = this.bookingType === BOOKING_TYPE.SINGLE ? time.numberOfPeople : 1;

          this.timePoint[key as TimePointValue] = {
            ...this.timePoint[key as TimePointValue],
            numberOfPeople: this.timePoint[key as TimePointValue].numberOfPeople + num,
            bookings: [
              ...this.timePoint[key as TimePointValue].bookings,
              bookings,
            ],
          };

        }
      });
    });
    return this;
  }

  addCapacity(bookingCapacity: BookingCapacity[]) {
    bookingCapacity.forEach(cap => {
      if (cap.booking_type !== this.bookingType) {
        return;
      }

      Object.keys(this.timePoint).forEach(time => {
        this.timePoint[time as TimePointValue] = {
          ...this.timePoint[time as TimePointValue],
          capacity: cap[KEY_OF_CAPACITY[time as keyof typeof KEY_OF_CAPACITY]],
          bookings: [...this.timePoint[time as TimePointValue].bookings],
        };
      });
    });
    return this;
  }

  getCapacity(time: TimePointValue) {
    return this.timePoint[time].capacity;
  }

  getNumberOfPeople(time: TimePointValue) {
    return this.timePoint[time].numberOfPeople;
  }

  getRemain(time: TimePointValue, currentPeople: number = 0) {
    return this.getCapacity(time) - (this.getNumberOfPeople(time) + currentPeople);
  }

  isAvailable(time: TimePointValue, currentPeople: number = 0) {
    return this.getRemain(time, currentPeople) >= 1;
  }

  isAvailableUntilTime(time: TimePointValue, untilTime: TimePointValue, currentPeople: number = 0) {
    const start = timePointArray.indexOf(time);
    const end = timePointArray.indexOf(untilTime) !== -1 ? timePointArray.indexOf(untilTime) : timePointArray.length;

    return timePointArray.slice(start, end + 1).every(time => {
      return this.isAvailable(time, currentPeople);
    });
  }
}


