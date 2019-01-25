// Copyright (c) 2018-2018. TIBCO Software Inc. All Rights Reserved. Confidential & Proprietary.
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersistanceService {
  pfx = '';
  set = (key: string, data: any) => {
    try {
      localStorage.setItem(`${this.pfx}.sw.${key}`, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }
  get = (key: string) => {
    try {
      return JSON.parse(localStorage.getItem(`${this.pfx}.sw.${key}`));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
