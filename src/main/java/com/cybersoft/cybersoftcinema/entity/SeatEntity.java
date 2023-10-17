package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.List;

@Entity (name = "seat")
public class SeatEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "idSeatType")
    private SeatTypeEntity seatTypeEntity;

    @ManyToOne
    @JoinColumn(name = "idSeatStatus")
    private SeatStatusEntity seatStatusEntity;

    @ManyToOne
    @JoinColumn(name = "idTicket")
    private TicketEntity ticketEntity;

    @ManyToOne
    @JoinColumn(name = "idPrice")
    private PriceEntity priceEntity;

    @ManyToOne
    @JoinColumn(name = "idMovieTheaterShowing")
    private MovieTheaterShowingEntity movieTheaterShowingEntity;

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

    public SeatStatusEntity getSeatStatusEntity() {
        return seatStatusEntity;
    }

    public void setSeatStatusEntity(SeatStatusEntity seatStatusEntity) {
        this.seatStatusEntity = seatStatusEntity;
    }

    public TicketEntity getTicketEntity() {
        return ticketEntity;
    }

    public void setTicketEntity(TicketEntity ticketEntity) {
        this.ticketEntity = ticketEntity;
    }

    public PriceEntity getPriceEntity() {
        return priceEntity;
    }

    public void setPriceEntity(PriceEntity priceEntity) {
        this.priceEntity = priceEntity;
    }

    public MovieTheaterShowingEntity getMovieTheaterShowingEntity() {
        return movieTheaterShowingEntity;
    }

    public void setMovieTheaterShowingEntity(MovieTheaterShowingEntity movieTheaterShowingEntity) {
        this.movieTheaterShowingEntity = movieTheaterShowingEntity;
    }
}
