package com.cybersoft.cybersoftcinema.payload.response;

import java.sql.Date;
import java.sql.Time;

public class QuickBuyMovieResponse {
    private int movieId;
    private String movieName;

    private int theaterId;
    private String theaterName;

    private int showingId;
    private Date showingDate;
    private Time showingTime;

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public int getTheaterId() {
        return theaterId;
    }

    public void setTheaterId(int theaterId) {
        this.theaterId = theaterId;
    }

    public String getTheaterName() {
        return theaterName;
    }

    public void setTheaterName(String theaterName) {
        this.theaterName = theaterName;
    }

    public int getShowingId() {
        return showingId;
    }

    public void setShowingId(int showingId) {
        this.showingId = showingId;
    }

    public Date getShowingDate() {
        return showingDate;
    }

    public void setShowingDate(Date showingDate) {
        this.showingDate = showingDate;
    }

    public Time getShowingTime() {
        return showingTime;
    }

    public void setShowingTime(Time showingTime) {
        this.showingTime = showingTime;
    }
}
