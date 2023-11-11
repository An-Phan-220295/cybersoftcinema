package com.cybersoft.cybersoftcinema.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Getter
@Setter
public class PriceResponse {
    private int idMovie;
    private String movieName;
    private String movieImg;
    private int ageRating;
    private int idTheater;
    private String theaterName;
    private int idShowing;
    private Date showingDate;
    private Time showingTime;
    private int idPriceNomal;
    private double priceNomal;
    private int idPriceDouble;
    private double priceDouble;
}
