package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;


@Entity (name = "seat")
public class SeatEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "seatnumber")
    private int seatNumber;

    @ManyToOne
    @JoinColumn(name = "idSeattype")
    private SeatTypeEntity seatTypeEntity;

    @ManyToOne
    @JoinColumn(name = "idPrice")
    private PriceEntity priceEntity;

    @ManyToOne
    @JoinColumn (name = "idMovie")
    private MovieEntity movieEntity;

    @ManyToOne
    @JoinColumn(name = "idTheater")
    private TheaterEntity theaterEntity;

    @ManyToOne
    @JoinColumn(name = "idShowing")
    private ShowingEntity showingEntity;

    @ManyToOne
    @JoinColumn(name = "idUsers")
    private UsersEntity usersEntity;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public SeatTypeEntity getSeatTypeEntity() {
        return seatTypeEntity;
    }

    public void setSeatTypeEntity(SeatTypeEntity seatTypeEntity) {
        this.seatTypeEntity = seatTypeEntity;
    }

    public PriceEntity getPriceEntity() {
        return priceEntity;
    }

    public void setPriceEntity(PriceEntity priceEntity) {
        this.priceEntity = priceEntity;
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

    public UsersEntity getUsersEntity() {
        return usersEntity;
    }

    public void setUsersEntity(UsersEntity usersEntity) {
        this.usersEntity = usersEntity;
    }

    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
        this.seatNumber = seatNumber;
    }
}
