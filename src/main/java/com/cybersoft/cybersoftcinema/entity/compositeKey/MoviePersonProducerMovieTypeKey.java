package com.cybersoft.cybersoftcinema.entity.compositeKey;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class MoviePersonProducerMovieTypeKey implements Serializable {

    @Column(name = "idMovie", nullable = false)
    private int idMovie;

    @Column(name = "idPerson", nullable = false)
    private int idPerson;

    @Column(name = "idProducer", nullable = false)
    private int idProducer;

    @Column(name = "idMovietype", nullable = false)
    private int idMovieType;

    public int getIdMovie() {
        return idMovie;
    }

    public void setIdMovie(int idMovie) {
        this.idMovie = idMovie;
    }

    public int getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(int idPerson) {
        this.idPerson = idPerson;
    }

    public int getIdProducer() {
        return idProducer;
    }

    public void setIdProducer(int idProducer) {
        this.idProducer = idProducer;
    }

    public int getIdMovieType() {
        return idMovieType;
    }

    public void setIdMovieType(int idMovieType) {
        this.idMovieType = idMovieType;
    }
}
