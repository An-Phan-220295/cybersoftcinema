package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.List;

@Entity(name = "movietype")
public class MovieTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany (mappedBy = "movieTypeEntity")
    private List<MoviePersonProducerMovieTypeEntity> moviePersonProducerMovieTypeEntities;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MoviePersonProducerMovieTypeEntity> getMoviePersonProducerMovieTypeEntities() {
        return moviePersonProducerMovieTypeEntities;
    }

    public void setMoviePersonProducerMovieTypeEntities(List<MoviePersonProducerMovieTypeEntity> moviePersonProducerMovieTypeEntities) {
        this.moviePersonProducerMovieTypeEntities = moviePersonProducerMovieTypeEntities;
    }
}
