package com.cybersoft.cybersoftcinema.payload.response;

import com.cybersoft.cybersoftcinema.entity.ShowingEntity;

import java.sql.Time;
import java.util.List;

public class ShowResponse {
    private int theaterId;
    private String theaterName;
    private List<ShowingEntity> showings;

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

    public List<ShowingEntity> getShowings() {
        return showings;
    }

    public void setShowings(List<ShowingEntity> showings) {
        this.showings = showings;
    }
}
