import { DatePipe } from '@angular/common';

export class DateHelper {
  public static formatDate(dateTime: Date): string | null {
    const datepipe: DatePipe = new DatePipe('en-US');
    const date = new Date(dateTime);
    let formattedDate = datepipe.transform(
      date,
      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    );
    return formattedDate;
  }
}
