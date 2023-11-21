package com.cybersoft.cybersoftcinema.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Getter
@Setter
public class ShowingRequest {
    private Time startTime;
    private Date showingDate;
}
