/**
 * Para descargar documentos en el navegador -> https://dev.to/angular/angular-file-download-with-progress-985
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

}
