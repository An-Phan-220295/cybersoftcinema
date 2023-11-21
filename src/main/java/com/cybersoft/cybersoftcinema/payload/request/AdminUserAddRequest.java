package com.cybersoft.cybersoftcinema.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class AdminUserAddRequest {
    private String fullName;
    private String phoneNumber;
    private char gender;
    private String email;
    private String password;
    private Date dob;
    private int idRole;
}
