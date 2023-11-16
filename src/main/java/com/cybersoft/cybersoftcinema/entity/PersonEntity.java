package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity(name = "person")
public class PersonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "pictures")
    private String picture;

    @Column(name = "dob")
    private java.sql.Date dob;

    @Column(name = "story")
    private String story;

    @ManyToOne
    @JoinColumn(name = "idCountry")
    private CountryEntity countryEntity;

    @ManyToOne
    @JoinColumn(name = "idPersontype")
    private PersonTypeEntity personTypeEntity;

    @OneToMany(mappedBy = "personEntity")
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

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public CountryEntity getCountryEntity() {
        return countryEntity;
    }

    public void setCountryEntity(CountryEntity countryEntity) {
        this.countryEntity = countryEntity;
    }

    public PersonTypeEntity getPersonTypeEntity() {
        return personTypeEntity;
    }

    public void setPersonTypeEntity(PersonTypeEntity personTypeEntity) {
        this.personTypeEntity = personTypeEntity;
    }

    public List<MoviePersonProducerMovieTypeEntity> getMoviePersonProducerMovieTypeEntities() {
        return moviePersonProducerMovieTypeEntities;
    }

    public void setMoviePersonProducerMovieTypeEntities(List<MoviePersonProducerMovieTypeEntity> moviePersonProducerMovieTypeEntities) {
        this.moviePersonProducerMovieTypeEntities = moviePersonProducerMovieTypeEntities;
    }
}
