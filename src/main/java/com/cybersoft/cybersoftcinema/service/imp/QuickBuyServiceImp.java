package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.QuickBuyMovieResponse;

import java.sql.Date;
import java.util.List;

public interface QuickBuyServiceImp {
    List<QuickBuyMovieResponse> getAllMovie();
    List<QuickBuyMovieResponse> getTheaterByMovie(int movieId);
    List<QuickBuyMovieResponse> getShowingDateByMovieAndTheater(int movieId, int theaterId);
    List<QuickBuyMovieResponse> getShowingTimeByMovieAndTheaterAndDate(int movieId, int theaterId, Date showingDate);
    List<QuickBuyMovieResponse> getAllDate();
    List<QuickBuyMovieResponse> getTheaterByDate(Date showingDate);
    List<QuickBuyMovieResponse> getMovieByDateAndTheater(Date showingDate,int theaterId);
    List<QuickBuyMovieResponse> getAllTheater();
    List<QuickBuyMovieResponse> findMovieByTheater(int theaterId);
}
