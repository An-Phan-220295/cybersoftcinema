package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;


import java.util.List;

@Entity (name = "showing")
public class ShowingEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @Column (name = "starttime")
    private Time startTime;

    @Column (name = "showingdate")
    private Date showingDate;

    @OneToMany (mappedBy = "showingEntity")
    private List<MovieTheaterShowingEntity> movieTheaterShowingEntities;

    @OneToMany(mappedBy = "showingEntity")
    private List<SeatEntity> seatEntities;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public Date getShowingDate() {
        return showingDate;
    }

    public void setShowingDate(Date showingDate) {
        this.showingDate = showingDate;
    }

    public List<MovieTheaterShowingEntity> getMovieTheaterShowingEntities() {
        return movieTheaterShowingEntities;
    }

    public void setMovieTheaterShowingEntities(List<MovieTheaterShowingEntity> movieTheaterShowingEntities) {
        this.movieTheaterShowingEntities = movieTheaterShowingEntities;
    }

    public List<SeatEntity> getSeatEntities() {
        return seatEntities;
    }

    public void setSeatEntities(List<SeatEntity> seatEntities) {
        this.seatEntities = seatEntities;
    }
}
