  
export class MapboxServiceService {

    constructor(private http) { }
  
    search_word(query: string) {
      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
      return this.http.get(url + query + '.json?types=address&access_token='
      + mapbox.accessToken)}
  }