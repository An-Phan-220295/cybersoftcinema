package com.cybersoft.cybersoftcinema.entity.compositeKey;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class MoviePersonKey implements Serializable {
    @Column(name = "idPerson", nullable = false)
    private int idPerson;

    @Column(name = "idMovie", nullable = false)
    private int idMovie;

}
