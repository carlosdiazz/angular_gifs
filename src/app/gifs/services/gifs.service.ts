import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private API_KEY = 'lnIXxNATzAtSHo62jKgRN2e6XsLKTJ7g';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  constructor(private http: HttpClient) {
    this.loadLocalStroage();
    this.cargarPrimero();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string): void {
    if (tag.length == 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStroage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  }

  private cargarPrimero(): void {
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this.tagsHistory[0]);
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((olTag) => olTag != tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }
}
