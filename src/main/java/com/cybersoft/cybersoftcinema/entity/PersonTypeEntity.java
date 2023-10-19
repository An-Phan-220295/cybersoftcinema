package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.List;

@Entity(name = "persontype")
public class PersonTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "personTypeEntity")
    private List<PersonEntity> personEntityList;

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

    public List<PersonEntity> getPersonEntityList() {
        return personEntityList;
    }

    public void setPersonEntityList(List<PersonEntity> personEntityList) {
        this.personEntityList = personEntityList;
    }
}
