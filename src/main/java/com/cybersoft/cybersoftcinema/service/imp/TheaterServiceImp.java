package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import com.cybersoft.cybersoftcinema.payload.request.AdminTheaterRequest;
import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import com.cybersoft.cybersoftcinema.payload.response.ShowResponse;
import com.cybersoft.cybersoftcinema.payload.response.TheaterResponse;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface TheaterServiceImp {
    List<TheaterResponse> getAllTheater ();
    TheaterResponse getTheaeterById(int id);
    List<MovieResponse> getMoviePosterByDateAndTheater(Date date, int theaterId);
    boolean insertTheater(AdminTheaterRequest adminTheaterRequest);
    boolean deleteTheaterbyId(int theaterId);
    boolean updateTheater(AdminTheaterRequest adminTheaterRequest);
}
