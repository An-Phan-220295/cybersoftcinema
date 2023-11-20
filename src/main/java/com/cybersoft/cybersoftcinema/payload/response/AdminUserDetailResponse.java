package com.cybersoft.cybersoftcinema.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Getter
@Setter
public class AdminUserDetailResponse {
    private String movieName;
    private String theaterName;
    private Date showingDate;
    private Time showingTime;
    private int seatNumber;
    private double price;
}
