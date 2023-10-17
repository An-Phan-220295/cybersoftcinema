package com.cybersoft.cybersoftcinema.entity;

import com.cybersoft.cybersoftcinema.entity.compositeKey.MoviePersonKey;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "person_movie")
public class PersonMovieEntity {
    @EmbeddedId
    private MoviePersonKey moviePersonKey;

    @ManyToOne
    @JoinColumn(name = "idMovie", updatable = false, insertable = false)
    private MovieEntity movieEntity;

    @ManyToOne
    @JoinColumn(name = "idPerson", updatable = false, insertable = false)
    private PersonEntity personEntity;
}
