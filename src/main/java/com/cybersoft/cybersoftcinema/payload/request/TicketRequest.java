package com.cybersoft.cybersoftcinema.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketRequest {
    private int seatNumber;
    private int idSeatType;
    private int idUser;
    private int idPrice;
    private int idMovie;
    private int idTheater;
    private int idShowing;
}
