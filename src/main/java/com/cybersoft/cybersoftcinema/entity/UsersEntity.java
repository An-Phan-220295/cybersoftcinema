package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity (name = "users")
public class UsersEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @Column (name = "fullname")
    private String fullName;

    @Column (name = "phonenumber")
    private String phoneNumber;

    @Column (name = "gender")
    private char gender;

    @Column (name = "email")
    private String email;

    @Column (name = "password")
    private String password;

    @Column (name = "dob")
    private Date dob;

    @ManyToOne
    @JoinColumn (name = "idRole")
    private RoleEntity roleEntity;

    @OneToMany(mappedBy = "usersEntity")
    private List<SeatEntity> seatEntities;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public RoleEntity getRoleEntity() {
        return roleEntity;
    }

    public void setRoleEntity(RoleEntity roleEntity) {
        this.roleEntity = roleEntity;
    }

    public List<SeatEntity> getSeatEntities() {
        return seatEntities;
    }

    public void setSeatEntities(List<SeatEntity> seatEntities) {
        this.seatEntities = seatEntities;
    }
}
