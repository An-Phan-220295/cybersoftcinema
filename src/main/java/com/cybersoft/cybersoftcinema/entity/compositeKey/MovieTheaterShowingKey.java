package com.cybersoft.cybersoftcinema.entity.compositeKey;

import javax.persistence.Column;
import java.io.Serializable;

public class MovieTheaterShowingKey implements Serializable {
    @Column(name = "idMovie", nullable = false)
    private int idMovie;

    @Column(name = "idTheater", nullable = false)
    private int idTheater;

    @Column(name = "idShowing", nullable = false)
    private int idShowing;

    public int getIdMovie() {
        return idMovie;
    }

    public void setIdMovie(int idMovie) {
        this.idMovie = idMovie;
    }

    public int getIdTheater() {
        return idTheater;
    }

    public void setIdTheater(int idTheater) {
        this.idTheater = idTheater;
    }

    public int getIdShowing() {
        return idShowing;
    }

    public void setIdShowing(int idShowing) {
        this.idShowing = idShowing;
    }
}
