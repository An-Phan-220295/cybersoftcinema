package com.cybersoft.cybersoftcinema.entity.compositeKey;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class MovieMovieTypeKey implements Serializable {

    @Column(name = "idMovie", nullable = false)
    private int idMovie;

    @Column(name = "idMovietype", nullable = false)
    private int idMovietype;

    public int getIdMovie() {
        return idMovie;
    }

    public void setIdMovie(int idMovie) {
        this.idMovie = idMovie;
    }

    public int getIdMovietype() {
        return idMovietype;
    }

    public void setIdMovietype(int idMovietype) {
        this.idMovietype = idMovietype;
    }
}
