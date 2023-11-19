package com.cybersoft.cybersoftcinema.entity;

import com.cybersoft.cybersoftcinema.entity.compositeKey.MoviePersonProducerMovieTypeKey;

import javax.persistence.*;

@Entity(name = "movie_person_producer_movietype")
public class MoviePersonProducerMovieTypeEntity {

    @EmbeddedId
    private MoviePersonProducerMovieTypeKey moviePersonProducerMovieTypeKey;

    @ManyToOne
    @JoinColumn(name = "idMovie", insertable = false, updatable = false)
    private MovieEntity movieEntity;

    @ManyToOne
    @JoinColumn(name = "idPerson", insertable = false, updatable = false)
    private PersonEntity personEntity;

    @ManyToOne
    @JoinColumn(name = "idProducer", insertable = false, updatable = false)
    private ProducerEntity producerEntity;

    @ManyToOne
    @JoinColumn(name = "idMovietype", insertable = false, updatable = false)
    private MovieTypeEntity movieTypeEntity;

    public MoviePersonProducerMovieTypeEntity(MoviePersonProducerMovieTypeKey moviePersonProducerMovieTypeKey) {
        this.moviePersonProducerMovieTypeKey = moviePersonProducerMovieTypeKey;
    }
    public MoviePersonProducerMovieTypeEntity() {}

    public MoviePersonProducerMovieTypeKey getMoviePersonProducerMovieTypeKey() {
        return moviePersonProducerMovieTypeKey;
    }

    public void setMoviePersonProducerMovieTypeKey(MoviePersonProducerMovieTypeKey moviePersonProducerMovieTypeKey) {
        this.moviePersonProducerMovieTypeKey = moviePersonProducerMovieTypeKey;
    }

    public MovieEntity getMovieEntity() {
        return movieEntity;
    }

    public void setMovieEntity(MovieEntity movieEntity) {
        this.movieEntity = movieEntity;
    }

    public PersonEntity getPersonEntity() {
        return personEntity;
    }

    public void setPersonEntity(PersonEntity personEntity) {
        this.personEntity = personEntity;
    }

    public ProducerEntity getProducerEntity() {
        return producerEntity;
    }

    public void setProducerEntity(ProducerEntity producerEntity) {
        this.producerEntity = producerEntity;
    }

    public MovieTypeEntity getMovieTypeEntity() {
        return movieTypeEntity;
    }

    public void setMovieTypeEntity(MovieTypeEntity movieTypeEntity) {
        this.movieTypeEntity = movieTypeEntity;
    }
}
