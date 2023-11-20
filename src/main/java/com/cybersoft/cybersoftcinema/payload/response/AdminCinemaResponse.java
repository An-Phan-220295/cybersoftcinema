package com.cybersoft.cybersoftcinema.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Getter
@Setter
public class AdminCinemaResponse {
    private int movieId;
    private String movieName;
    private int theaterId;
    private String theaterName;
    private int showingId;
    private Date showingDate;
    private Time startTime;
}
