package com.cybersoft.cybersoftcinema.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.sql.Date;


public class SignUpRequest {
    @NotNull(message = "Không được rỗng")
    @NotBlank( message = "Không được rỗng")
    private String fullName;

    @NotNull(message = "Không được rỗng")
    @NotBlank( message = "Không được rỗng")
    private String phoneNumber;

    @NotNull(message = "Không được rỗng")
    @NotBlank( message = "Không được rỗng")
    private char gender;

    @NotNull(message = "Không được rỗng")
    @NotBlank( message = "Không được rỗng")
    @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
    private String email;

    @NotNull(message = "Không được rỗng")
    @NotBlank( message = "Không được rỗng")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}")
    private String password;

    @NotNull(message = "Không được rỗng")
    @NotBlank( message = "Không được rỗng")
    private Date dob;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }
}
