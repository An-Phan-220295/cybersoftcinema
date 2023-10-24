package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.List;

@Entity (name = "theater")
public class TheaterEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @Column (name = "name")
    private String name;

    @Column (name = "address")
    private String address;

    @Column (name = "content")
    private String content;

    @OneToMany(mappedBy = "theaterEntity")
    private List<MovieTheaterShowingEntity> movieTheaterShowingEntities;

    @OneToMany(mappedBy = "theaterEntity")
    private List<SeatEntity> seatEntities;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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
