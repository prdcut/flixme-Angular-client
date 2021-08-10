import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { DeleteFavoriteMovieService } from '../fetch-api-data.service';
import { DeleteUserService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = [];
  movies: any[] = [];
  favorites: any = [];
  birthdate: any = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: DeleteFavoriteMovieService,
    public fetchApiData3: DeleteUserService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let FavoriteMovies = localStorage.getItem('FavoriteMovies');
    let Username = localStorage.getItem('username');
    let Email = localStorage.getItem('Email');
    let Birthdate = localStorage.getItem('Birthdate');
    this.user = {
      "FavoriteMovies": FavoriteMovies,
      "Username": Username,
      "Email": Email,
      "Birtdate": Birthdate,
    }
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }


  removeFavorites(id: string, title: string): void {
    this.fetchApiData2.deleteFavoriteMovie(id).subscribe((resp) => {
      console.log(resp);
      let favmovies = resp.FavoriteMovies;
      localStorage.setItem('FavoriteMovies', favmovies);
      this.snackBar.open(
        `${title} has been removed from your favourites!`,
        'OK',
        {
          duration: 3000,
        }
      );
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  deleteUser(): void {
    let check = confirm(
      'This will delete your profile! Are you sure you want to continue?'
    );
    if (check) {
      this.fetchApiData3.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Profile deleted', 'OK', {
          duration: 3000,
        });
      });
    } else {
      window.location.reload();
    }
  }
  profileUpdateDialog(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      panelClass: 'update-dialog',
    });
  }

}