package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.MovieEntity;
import com.cybersoft.cybersoftcinema.entity.ShowingEntity;
import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import com.cybersoft.cybersoftcinema.payload.response.QuickBuyMovieResponse;
import com.cybersoft.cybersoftcinema.repository.MovieTheaterShowRepository;
import com.cybersoft.cybersoftcinema.service.imp.QuickBuyServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuickBuyService implements QuickBuyServiceImp {

    @Autowired
    private MovieTheaterShowRepository movieTheaterShowRepository;

    @Override
    public List<QuickBuyMovieResponse> getAllMovie() {
        List<QuickBuyMovieResponse> list = new ArrayList<>();
        List<MovieEntity> listMovie = movieTheaterShowRepository.findMovieName();

        for (MovieEntity data : listMovie) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setMovieId(data.getId());
            movieResponse.setMovieName(data.getName());
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<QuickBuyMovieResponse> getTheaterByMovie(int movieId) {
        List<QuickBuyMovieResponse> list = new ArrayList<>();
        List<TheaterEntity> listMovie = movieTheaterShowRepository.findTheaterByMovie(movieId);

        for (TheaterEntity data : listMovie) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setTheaterId(data.getId());
            movieResponse.setTheaterName(data.getName());
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<QuickBuyMovieResponse> getShowingDateByMovieAndTheater(int movieId, int theaterId) {
        List<Date> listDate = movieTheaterShowRepository.findShowingDateByMovieAndTheater(movieId, theaterId);

        List<QuickBuyMovieResponse> list = new ArrayList<>();
        for (Date data : listDate) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setShowingDate(data);
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<QuickBuyMovieResponse> getShowingTimeByMovieAndTheaterAndDate(int movieId, int theaterId, Date showingDate) {
        List<QuickBuyMovieResponse> list = new ArrayList<>();
        List<ShowingEntity> listMovie = movieTheaterShowRepository.findShowingTimeByMovieAndTheaterAndDate(movieId, theaterId, showingDate);

        for (ShowingEntity data : listMovie) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setShowingId(data.getId());
            movieResponse.setShowingTime(data.getStartTime());
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<QuickBuyMovieResponse> getAllDate() {
        List<Date> listDate = movieTheaterShowRepository.findAllDate();

        List<QuickBuyMovieResponse> list = new ArrayList<>();
        for (Date data : listDate) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setShowingDate(data);
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<QuickBuyMovieResponse> getTheaterByDate(Date showingDate) {
        List<QuickBuyMovieResponse> list = new ArrayList<>();
        List<TheaterEntity> listMovie = movieTheaterShowRepository.findTheaterByDate(showingDate);

        for (TheaterEntity data : listMovie) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setTheaterId(data.getId());
            movieResponse.setTheaterName(data.getName());
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<QuickBuyMovieResponse> getMovieByDateAndTheater(Date showingDate, int theaterId) {
        List<QuickBuyMovieResponse> list = new ArrayList<>();
        List<MovieEntity> listMovie = movieTheaterShowRepository.findMovieEByDateAndTheater(showingDate, theaterId);

        for (MovieEntity data : listMovie) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setMovieId(data.getId());
            movieResponse.setMovieName(data.getName());
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<QuickBuyMovieResponse> getAllTheater() {
        List<QuickBuyMovieResponse> list = new ArrayList<>();
        List<TheaterEntity> listMovie = movieTheaterShowRepository.getAllTheater();

        for (TheaterEntity data : listMovie) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setTheaterId(data.getId());
            movieResponse.setTheaterName(data.getName());
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<QuickBuyMovieResponse> findMovieByTheater(int theaterId) {
        List<QuickBuyMovieResponse> list = new ArrayList<>();
        List<MovieEntity> listMovie = movieTheaterShowRepository.findMovieEByTheater(theaterId);

        for (MovieEntity data : listMovie) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setMovieId(data.getId());
            movieResponse.setMovieName(data.getName());
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<QuickBuyMovieResponse> getShowingByMovieAndTheater(int movieId, int theaterId) {
        List<ShowingEntity> showingEntityList = movieTheaterShowRepository.findShowingByMovieAndTheater(movieId, theaterId);

        List<QuickBuyMovieResponse> list = new ArrayList<>();
        for (ShowingEntity data : showingEntityList) {
            QuickBuyMovieResponse movieResponse = new QuickBuyMovieResponse();
            movieResponse.setShowingId(data.getId());
            movieResponse.setShowingDate(data.getShowingDate());
            movieResponse.setShowingTime(data.getStartTime());
            list.add(movieResponse);
        }
        return list;
    }

}