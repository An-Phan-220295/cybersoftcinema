package com.cybersoft.cybersoftcinema.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class UserInfoResponse {
    private int id;
    private String fullName;
    private String phoneNumber;
    private String gender;
    private String email;
    private Date dob;
    private String role;
}
