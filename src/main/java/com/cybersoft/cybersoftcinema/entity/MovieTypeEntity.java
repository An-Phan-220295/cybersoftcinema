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
    private List<MovieMovieTypeEntity> movieMovieTypeEntities;

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

    public List<MovieMovieTypeEntity> getMovieMovieTypeEntities() {
        return movieMovieTypeEntities;
    }

    public void setMovieMovieTypeEntities(List<MovieMovieTypeEntity> movieMovieTypeEntities) {
        this.movieMovieTypeEntities = movieMovieTypeEntities;
    }
}
