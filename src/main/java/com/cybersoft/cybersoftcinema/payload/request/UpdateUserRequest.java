package com.cybersoft.cybersoftcinema.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class UpdateUserRequest {
    private int id;
    private String fullName;
    private String phoneNumber;
    private char gender;
    private String email;
    private Date dob;
    private int idRole;
}
