package com.cybersoft.cybersoftcinema.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class UserInfoResponse {
    private String fullName;
    private String phoneNumber;
    private String gender;
    private String email;
    private Date dob;
}
