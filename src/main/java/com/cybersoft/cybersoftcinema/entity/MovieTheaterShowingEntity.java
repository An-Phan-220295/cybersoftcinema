package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.List;

@Entity (name = "movie_theater_showing")
public class MovieTheaterShowingEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn (name = "idMovie")
    private MovieEntity movieEntity;

    @ManyToOne
    @JoinColumn (name = "idTheater")
    private TheaterEntity theaterEntity;

    @ManyToOne
    @JoinColumn (name = "idShowing")
    private ShowingEntity showingEntity;

    @OneToMany(mappedBy = "movieTheaterShowingEntity")
    private List<SeatEntity> seatEntities;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public MovieEntity getMovieEntity() {
        return movieEntity;
    }

    public void setMovieEntity(MovieEntity movieEntity) {
        this.movieEntity = movieEntity;
    }

    public TheaterEntity getTheaterEntity() {
        return theaterEntity;
    }

    public void setTheaterEntity(TheaterEntity theaterEntity) {
        this.theaterEntity = theaterEntity;
    }

    public ShowingEntity getShowingEntity() {
        return showingEntity;
    }

    public void setShowingEntity(ShowingEntity showingEntity) {
        this.showingEntity = showingEntity;
    }

    public List<SeatEntity> getSeatEntities() {
        return seatEntities;
    }

    public void setSeatEntities(List<SeatEntity> seatEntities) {
        this.seatEntities = seatEntities;
    }
}
