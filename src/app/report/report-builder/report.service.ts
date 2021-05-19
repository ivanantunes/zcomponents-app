import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import {
  ZReportFilter,
  ZReportMetadata,
  ZReportSource,
  ZSearchResult,
  ZTranslateService
} from 'zmaterial';
import { MetadataExemplo } from './metadata-example';

interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService extends ZReportSource {

  private ELEMENT_DATA: PeriodicElement[] = [
    {position: '1', name: 'Hydrogen', weight: '1.0079', symbol: 'H'},
    {position: '2', name: 'Helium', weight: '4.0026', symbol: 'He'},
    {position: '3', name: 'Lithium', weight: '6.941', symbol: 'Li'},
    {position: '4', name: 'Beryllium', weight: '9.0122', symbol: 'Be'},
    {position: '5', name: 'Boron', weight: '10.811', symbol: 'B'},
    {position: '6', name: 'Carbon', weight: '12.0107', symbol: 'C'},
    {position: '7', name: 'Nitrogen', weight: '14.0067', symbol: 'N'},
    {position: '8', name: 'Oxygen', weight: '15.9994', symbol: 'O'},
    {position: '9', name: 'Fluorine', weight: '18.9984', symbol: 'F'},
    {position: '10', name: 'Neon', weight: '20.1797', symbol: 'Ne'}
  ];

  constructor(
    private translate: ZTranslateService
  ) {
    super(translate);
  }

  getMetadata(screen: string): Observable<ZReportMetadata> {
    return of(MetadataExemplo);
  }
  getDataSelector(screen: string, filter: ZReportFilter): Observable<ZSearchResult<any>> {
    return of(this.ELEMENT_DATA.filter(i => i.name.includes(filter.search))).pipe(
      switchMap((res) => {
        return of({
          totalItems: res.length,
          items: res
        });
      }),
      delay(100)
    );


  }
  getFilteredReportData(screen: string, filter: any): Observable<any[]> {
    if (filter.position_example) {
      return of(this.ELEMENT_DATA.filter((f) => f.position === filter.position_example.position));
    }

    return of(this.ELEMENT_DATA);
  }

}
