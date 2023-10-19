package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.List;

@Entity (name = "price")
public class PriceEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column (name = "showingdate")
    private Date showingDate;

    @Column (name = "showingtime")
    private Time showingTime;

    @Column (name = "price")
    private double price;

    @ManyToOne
    @JoinColumn (name = "idSeatType")
    private SeatTypeEntity seatTypeEntity;

    @OneToMany (mappedBy = "priceEntity")
    List <SeatEntity> seatEntities;

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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public SeatTypeEntity getSeatTypeEntity() {
        return seatTypeEntity;
    }

    public void setSeatTypeEntity(SeatTypeEntity seatTypeEntity) {
        this.seatTypeEntity = seatTypeEntity;
    }

    public List<SeatEntity> getSeatEntities() {
        return seatEntities;
    }

    public void setSeatEntities(List<SeatEntity> seatEntities) {
        this.seatEntities = seatEntities;
    }
}
