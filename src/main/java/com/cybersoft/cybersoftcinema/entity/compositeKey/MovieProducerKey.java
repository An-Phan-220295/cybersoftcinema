package com.cybersoft.cybersoftcinema.entity.compositeKey;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class MovieProducerKey implements Serializable {

    @Column(name = "idMovie", nullable = false)
    private int idMovie;

    @Column(name = "idProducer", nullable = false)
    private int idProducer;

    public int getIdMovie() {
        return idMovie;
    }

    public void setIdMovie(int idMovie) {
        this.idMovie = idMovie;
    }

    public int getIdProducer() {
        return idProducer;
    }

    public void setIdProducer(int idProducer) {
        this.idProducer = idProducer;
    }
}
