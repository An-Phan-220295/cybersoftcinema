package com.cybersoft.cybersoftcinema.entity;

import com.cybersoft.cybersoftcinema.entity.compositeKey.MovieTheaterShowingKey;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;

@Entity (name = "movie_theater_showing")
public class MovieTheaterShowingEntity {

    @EmbeddedId
    private MovieTheaterShowingKey movieTheaterShowingKey;

    @ManyToOne
    @JoinColumn (name = "idMovie", insertable = false, updatable = false)
    private MovieEntity movieEntity;

    @ManyToOne
    @JoinColumn (name = "idTheater", insertable = false, updatable = false)
    private TheaterEntity theaterEntity;

    @ManyToOne
    @JoinColumn (name = "idShowing", insertable = false, updatable = false)
    private ShowingEntity showingEntity;

    public MovieEntity getMovieEntity() {
        return movieEntity;
    }

    public void setMovieEntity(MovieEntity movieEntity) {
        this.movieEntity = movieEntity;
    }

    public TheaterEntity getTheaterEntity() {
        return theaterEntity;
    }

    public void setTheaterEntity(TheaterEntity theaterEntity) {
        this.theaterEntity = theaterEntity;
    }

    public ShowingEntity getShowingEntity() {
        return showingEntity;
    }

    public void setShowingEntity(ShowingEntity showingEntity) {
        this.showingEntity = showingEntity;
    }

    public MovieTheaterShowingKey getMovieTheaterShowingKey() {
        return movieTheaterShowingKey;
    }

    public void setMovieTheaterShowingKey(MovieTheaterShowingKey movieTheaterShowingKey) {
        this.movieTheaterShowingKey = movieTheaterShowingKey;
    }
}
