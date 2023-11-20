package com.cybersoft.cybersoftcinema.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CinemaRequest {
    private int idMovie;
    private int idTheater;
    private int idShowing;

//    @Override
//    public String toString() {
//        return "CinemaRequest{" +
//                "idMovie=" + idMovie +
//                ", idTheater=" + idTheater +
//                ", idShowing=" + idShowing +
//                '}';
//    }
}
