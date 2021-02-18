import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// ************************ ENVIRONMENT ****************************//

import { environment } from '../../environments/environment';

// ******************** MODELS AND INTERFACES **********************//

import { Item, YoutubeResponse, Video } from '../models/youtube.models';



@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeurl = 'https://www.googleapis.com/youtube/v3';
  private youtubeApiKey = environment.youtbeApiKey;
  private playList = environment.uploadsPlayList;
  private nextPageToken = '';

  constructor( private http: HttpClient ) {}

  getVideos(): Observable<Video[]>{

    const url = `${this.youtubeurl}/playlistItems`;

    const params = new HttpParams()
          .set('key', this.youtubeApiKey)
          .set('part', 'snippet')
          .set('maxResults', '20')
          .set('playlistId', this.playList)
          .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>( url, { params } )
            .pipe(
              map( resp => {
                this.nextPageToken = resp.nextPageToken;
                return resp.items;
              }),

              map( items => items.map( video => video.snippet) )
            )
    ;

  }

}
