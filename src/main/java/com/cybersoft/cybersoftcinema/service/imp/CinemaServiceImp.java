package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.request.AdminUpdateCinemaRequest;
import com.cybersoft.cybersoftcinema.payload.request.CinemaRequest;
import com.cybersoft.cybersoftcinema.payload.response.AdminCinemaResponse;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

public interface CinemaServiceImp {
    List<AdminCinemaResponse> findAllCinema();
    boolean insertCinema(CinemaRequest cinemaRequest);
    boolean checkExisting(CinemaRequest cinemaRequest);
    int findIdShowing(Date showingDate, Time startTime);
    boolean deleteCinema(CinemaRequest cinemaRequest);
    AdminCinemaResponse findByAId(int movieId, int theaterId, int showingId);
    boolean updateCinema(AdminUpdateCinemaRequest cinemaRequest);
}
