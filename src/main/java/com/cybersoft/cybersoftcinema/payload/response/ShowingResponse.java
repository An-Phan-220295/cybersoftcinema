package com.cybersoft.cybersoftcinema.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Getter
@Setter
public class ShowingResponse {
    private int id;
    private Time startTime;
    private Date showingDate;
}
