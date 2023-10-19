package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name = "person")
public class PersonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "picture")
    private String picture;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "story")
    private String story;

    @ManyToOne
    @JoinColumn(name = "idCountry")
    private CountryEntity countryEntity;

    @ManyToOne
    @JoinColumn(name = "idPersontype")
    private PersonTypeEntity personTypeEntity;

    @OneToMany(mappedBy = "personEntity")
    private List<PersonMovieEntity> personMovieEntities;
}
