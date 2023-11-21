package com.cybersoft.cybersoftcinema.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class AdminPersonRequest {
    private String personName;
    private String picture;
    private Date birthday;
    private int personTypeId;
    private int countryId;
    private String story;
}
