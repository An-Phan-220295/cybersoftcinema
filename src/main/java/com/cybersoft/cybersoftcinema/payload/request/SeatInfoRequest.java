package com.cybersoft.cybersoftcinema.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatInfoRequest {
    private int idMovie;
    private int idTheater;
    private int idShowing;
}
