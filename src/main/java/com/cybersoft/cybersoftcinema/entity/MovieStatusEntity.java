package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.List;

@Entity(name = "moviestatus")
public class MovieStatusEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "movieStatusEntity")
    private List<MovieEntity> movieEntities;

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

    public List<MovieEntity> getMovieEntities() {
        return movieEntities;
    }

    public void setMovieEntities(List<MovieEntity> movieEntities) {
        this.movieEntities = movieEntities;
    }
}
