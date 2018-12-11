// This pipe will display a date based on how long ago it was: eg. 5 mins ago, 1 hour ago, just now etc etc

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationSince'
})
export class DurationSincePipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    const seconds: number = Math.floor((+new Date() - +new Date(value)) / 1000);
    let interval: number = Math.floor(seconds / 31536000);
    // years
    if (interval >= 1) {
      if (interval === 1) {
        return interval + ' year ago';
      } else {
        return interval + ' years ago';
      }
    }
    // months
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      if (interval === 1) {
        return interval + ' month ago';
      } else {
        return interval + ' months ago';
      }
    }
    // weeks
    interval = Math.floor(seconds / 604800);
    if (interval >= 1) {
      if (interval === 1) {
        return interval + ' week ago';
      } else {
        return interval + ' weeks ago';
      }
    }
    // days
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      if (interval === 1) {
        return ' yesterday';
      } else {
        return interval + ' days ago';
      }
    }
    // hours
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      if (interval === 1) {
        return interval + ' hour ago';
      } else {
        return interval + ' hours ago';
      }
    }
    // minutes
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      if (interval === 1) {
        return interval + ' minute ago';
      } else {
        return interval + ' minutes ago';
      }
    }

    return 'Just now';
  }

}
