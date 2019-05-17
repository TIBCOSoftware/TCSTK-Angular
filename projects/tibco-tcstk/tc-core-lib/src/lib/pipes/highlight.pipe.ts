/* used to highlight search results in a list where search term matches
 *
 * original source from https://gist.github.com/adamrecsko/0f28f474eca63e0279455476cc11eca7
 * post by ankitgrover
*/

import { Pipe, PipeTransform } from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  /* use this for single match search */
  static SINGLE_MATCH = 'Single-Match';
  /* use this for single match search with a restriction that target should start with search string */
  static SINGLE_AND_STARTS_WITH_MATCH = 'Single-And-StartsWith-Match';
  /* use this for global search */
  static MULTI_MATCH = 'Multi-Match';

  transform(data: string,
            highlightText: string,
            option: string = 'Single-And-StartsWith-Match',
            caseSensitive: boolean = false,
            highlightStyleName: string = 'search-highlight'): SafeHtml {
    if (highlightText && data && option) {
      let regex: any = '';
      const caseFlag: string = !caseSensitive ? 'i' : '';
      switch (option) {
        case 'Single-Match': {
          regex = new RegExp(highlightText, caseFlag);
          break;
        }
        case 'Single-And-StartsWith-Match': {
          regex = new RegExp('^' + highlightText, caseFlag);
          break;
        }
        case 'Multi-Match': {
          regex = new RegExp(highlightText, 'g' + caseFlag);
          break;
        }
        default: {
          // default will be a global case-insensitive match
          regex = new RegExp(highlightText, 'gi');
        }
      }
      return data.replace(regex, (match) => `<span class="${highlightStyleName}">${match}</span>`);

    } else {
      return data;
    }
  }

}
