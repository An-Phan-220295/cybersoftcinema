package com.cybersoft.cybersoftcinema.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateCinemaRequest {
    private CinemaRequest existCinemaRequest;
    private CinemaRequest newCinemaRequest;

//    @Override
//    public String toString() {
//        return "AdminUpdateCinemaRequest{" +
//                "existCinemaRequest=" + existCinemaRequest +
//                ", newCinemaRequest=" + newCinemaRequest +
//                '}';
//    }
}
