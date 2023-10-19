package com.cybersoft.cybersoftcinema.entity;

import com.cybersoft.cybersoftcinema.entity.compositeKey.MovieProducerKey;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "movie_producer")
public class MovieProducerEntity {
    @EmbeddedId
    private MovieProducerKey movieProducerKey;

    @ManyToOne
    @JoinColumn(name = "idMovie", insertable = false,updatable = false)
    private MovieEntity movieEntity;

    @ManyToOne
    @JoinColumn(name = "idProducer", insertable = false,updatable = false)
    private ProducerEntity producerEntity;

    public MovieProducerKey getMovieProducerKey() {
        return movieProducerKey;
    }

    public void setMovieProducerKey(MovieProducerKey movieProducerKey) {
        this.movieProducerKey = movieProducerKey;
    }

    public MovieEntity getMovieEntity() {
        return movieEntity;
    }

    public void setMovieEntity(MovieEntity movieEntity) {
        this.movieEntity = movieEntity;
    }

    public ProducerEntity getProducerEntity() {
        return producerEntity;
    }

    public void setProducerEntity(ProducerEntity producerEntity) {
        this.producerEntity = producerEntity;
    }
}
