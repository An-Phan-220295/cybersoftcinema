package com.cybersoft.cybersoftcinema.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Getter
@Setter
public class TicketInfoResponse {
    private String movieName;
    private String movieImg;
    private String theaterName;
    private Date showingDate;
    private Time showingTime;
    private List<Integer> seatNumber;
}
