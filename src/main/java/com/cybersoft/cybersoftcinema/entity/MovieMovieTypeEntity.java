package com.cybersoft.cybersoftcinema.entity;

import com.cybersoft.cybersoftcinema.entity.compositeKey.MovieMovieTypeKey;

import javax.persistence.*;

@Entity(name = "movie_movietype")
public class MovieMovieTypeEntity {
    @EmbeddedId
    private MovieMovieTypeKey movieMovieTypeKey;

    @ManyToOne
    @JoinColumn(name = "idMovie", insertable = false, updatable = false)
    private MovieEntity movieEntity;

    @ManyToOne
    @JoinColumn(name = "idMovietype", insertable = false, updatable = false)
    private MovieTypeEntity movieTypeEntity;

    public MovieMovieTypeKey getMovieMovieTypeKey() {
        return movieMovieTypeKey;
    }

    public void setMovieMovieTypeKey(MovieMovieTypeKey movieMovieTypeKey) {
        this.movieMovieTypeKey = movieMovieTypeKey;
    }

    public MovieEntity getMovieEntity() {
        return movieEntity;
    }

    public void setMovieEntity(MovieEntity movieEntity) {
        this.movieEntity = movieEntity;
    }

    public MovieTypeEntity getMovieTypeEntity() {
        return movieTypeEntity;
    }

    public void setMovieTypeEntity(MovieTypeEntity movieTypeEntity) {
        this.movieTypeEntity = movieTypeEntity;
    }
}
