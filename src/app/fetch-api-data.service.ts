import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://flixmebackend.herokuapp.com/';

//User Registration
/**
   * API call to the user registration endpoint.
   * @param userDetails User name, password, email and date of birth.
   */
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  constructor(private http: HttpClient) { }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}

//User Login
/**
  * API call to the user login endpoint.
  * @param username Username of type string.
  * @param password Password of type string.
  * @returns object with username and bearer token
  */
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) { }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}

//Get all movies
/**
   * API call to the movies endpoint.
   * @returns array of movie objects.
   */
@Injectable({
  providedIn: 'root'
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) { }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}

//Get one movie
/**
   * API call to a single movie endpoint.
   * @params movie title of type string.
   * @returns movie object.
   */
@Injectable({
  providedIn: 'root'
})
export class GetOneMovieService {
  constructor(private http: HttpClient) { }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    console.log(res);
    const body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}

//Get director
/**
   * API call to the director name endpoint.
   * @param directorName name of movie director of type string.
   * @returns director object.
   */
@Injectable({
  providedIn: 'root'
})
export class GetDirectorService {
  constructor(private http: HttpClient) { }

  public getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}

//Get genre
/**
   * API call to the genre name endpoint.
   * @param genre name of genre of type string.
   * @returns genre object.
   */
@Injectable({
  providedIn: 'root'
})
export class GetGenreService {
  constructor(private http: HttpClient) { }

  public getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}

//Get user
/**
* API call to the User endpoint
* in order to get the user data.
* @param getUser object of user name, password, email and date of birth.
* @returns user object.
*/
@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor(private http: HttpClient) { }

  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}

/* 
Get favourite movies for a user
Such request was not created in the API
*/

//Add a movie to favorite movies
/**
 * API call to the movie ID endpoint
 * in order to add the movie ID to the FavoriteMovies array in the user object.
 * @param movieID of type string.
 */
@Injectable({
  providedIn: 'root'
})
export class AddFavoriteMovieService {
  constructor(private http: HttpClient) { }

  public addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http
      .post(apiUrl + `users/${user}/favorites/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}

//Edit user
/**
* API call to the User endpoint
* in order to edit the user data.
* @param userDetails object of user name, password, email and date of birth.
* @returns user object.
*/
@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  constructor(private http: HttpClient) { }

  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http
      .put(apiUrl + `users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}

//Delete user
/**
 * API call to the User endpoint
 * in order to delete the user data.
 * @returns user object.
 */
@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  constructor(private http: HttpClient) { }

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}

//Delete a movie from the favorite movies
/**
 * API call to the movie ID endpoint
 * in order to delete the movie ID from the FavoriteMovies array in the user object.
 * @param movieID of type string.
 */
@Injectable({
  providedIn: 'root'
})
export class DeleteFavoriteMovieService {
  constructor(private http: HttpClient) { }

  public deleteFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + `users/${user}/favorites/${_id}`,
        {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}