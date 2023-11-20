package com.cybersoft.cybersoftcinema.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class AdminPersonResponse {
    private int personId;
    private String personName;
    private String picture;
    private Date birthday;
    private int personTypeId;
    private String personTypeName;
    private int countryId;
    private String countryName;
    private String story;
}
