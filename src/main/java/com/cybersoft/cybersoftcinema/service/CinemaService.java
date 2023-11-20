package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.MovieEntity;
import com.cybersoft.cybersoftcinema.entity.MovieTheaterShowingEntity;
import com.cybersoft.cybersoftcinema.entity.ShowingEntity;
import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import com.cybersoft.cybersoftcinema.entity.compositeKey.MovieTheaterShowingKey;
import com.cybersoft.cybersoftcinema.payload.request.AdminUpdateCinemaRequest;
import com.cybersoft.cybersoftcinema.payload.request.CinemaRequest;
import com.cybersoft.cybersoftcinema.payload.response.AdminCinemaResponse;
import com.cybersoft.cybersoftcinema.repository.MovieTheaterShowRepository;
import com.cybersoft.cybersoftcinema.repository.ShowingRepository;
import com.cybersoft.cybersoftcinema.service.imp.CinemaServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Service
public class CinemaService implements CinemaServiceImp {

    @Autowired
    private MovieTheaterShowRepository movieTheaterShowRepository;

    @Autowired
    private ShowingRepository showingRepository;

    @Override
    public List<AdminCinemaResponse> findAllCinema() {
        List<AdminCinemaResponse> list = new ArrayList<>();
        List<MovieTheaterShowingEntity> movieTheaterShowingEntity = movieTheaterShowRepository.findAll();
        for (MovieTheaterShowingEntity data : movieTheaterShowingEntity) {
            AdminCinemaResponse adminCinemaResponse = new AdminCinemaResponse();
            adminCinemaResponse.setMovieId(data.getMovieEntity().getId());
            adminCinemaResponse.setMovieName(data.getMovieEntity().getName());
            adminCinemaResponse.setTheaterId(data.getTheaterEntity().getId());
            adminCinemaResponse.setTheaterName(data.getTheaterEntity().getName());
            adminCinemaResponse.setShowingId(data.getShowingEntity().getId());
            adminCinemaResponse.setShowingDate(data.getShowingEntity().getShowingDate());
            adminCinemaResponse.setStartTime(data.getShowingEntity().getStartTime());
            list.add(adminCinemaResponse);
        }
        return list;
    }

    @Override
    public boolean insertCinema(CinemaRequest cinemaRequest) {
        boolean isSuccess = false;
        MovieTheaterShowingEntity entity = new MovieTheaterShowingEntity();
        MovieTheaterShowingKey key = new MovieTheaterShowingKey(cinemaRequest.getIdMovie()
                ,cinemaRequest.getIdTheater(),cinemaRequest.getIdShowing());
        entity.setMovieTheaterShowingKey(key);

//        System.out.println(cinemaRequest.getIdMovie());
        MovieEntity movieEntity = new MovieEntity();
        movieEntity.setId(cinemaRequest.getIdMovie());
        entity.setMovieEntity(movieEntity);

//        System.out.println(cinemaRequest.getIdTheater());
        TheaterEntity theaterEntity = new TheaterEntity();
        theaterEntity.setId(cinemaRequest.getIdTheater());
        entity.setTheaterEntity(theaterEntity);

//        System.out.println(cinemaRequest.getIdShowing());
        ShowingEntity showingEntity = new ShowingEntity();
        showingEntity.setId(cinemaRequest.getIdShowing());
        entity.setShowingEntity(showingEntity);
        try {
            movieTheaterShowRepository.save(entity);
            isSuccess = true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
        return isSuccess;
    }

    @Override
    public boolean checkExisting(CinemaRequest cinemaRequest) {
        boolean isExisting = movieTheaterShowRepository.checkExisting(cinemaRequest.getIdMovie()
                ,cinemaRequest.getIdTheater(),cinemaRequest.getIdShowing());
        return isExisting;
    }

    @Override
    public int findIdShowing(Date showingDate, Time startTime) {
        ShowingEntity showingEntity = showingRepository.findByShowingDateAndStartTime(showingDate,startTime);
        int id = showingEntity.getId();
        return id;
    }

    @Override
    public boolean deleteCinema(CinemaRequest cinemaRequest) {
        boolean isSuccess = false;
        int result = movieTheaterShowRepository.deleteCinema(cinemaRequest.getIdMovie(),cinemaRequest.getIdTheater(),cinemaRequest.getIdShowing());
        if(result != 0)
            isSuccess = true;
        return isSuccess;
    }

    @Override
    public AdminCinemaResponse findByAId(int movieId, int theaterId, int showingId) {
        MovieTheaterShowingEntity movieTheaterShowingEntity = movieTheaterShowRepository
                .findInfoById(movieId,theaterId,showingId);
        AdminCinemaResponse adminCinemaResponse = new AdminCinemaResponse();
        adminCinemaResponse.setMovieName(movieTheaterShowingEntity.getMovieEntity().getName());
        adminCinemaResponse.setTheaterName(movieTheaterShowingEntity.getTheaterEntity().getName());
        adminCinemaResponse.setShowingDate(movieTheaterShowingEntity.getShowingEntity().getShowingDate());
        adminCinemaResponse.setStartTime(movieTheaterShowingEntity.getShowingEntity().getStartTime());

        return adminCinemaResponse;
    }

    @Override
    public boolean updateCinema(AdminUpdateCinemaRequest cinemaRequest) {
        boolean isSuccess = false;
        int result = movieTheaterShowRepository
                .updateCinema(cinemaRequest.getExistCinemaRequest().getIdMovie(),cinemaRequest.getExistCinemaRequest().getIdTheater()
                ,cinemaRequest.getExistCinemaRequest().getIdShowing(),cinemaRequest.getNewCinemaRequest().getIdMovie()
                ,cinemaRequest.getNewCinemaRequest().getIdTheater(),cinemaRequest.getNewCinemaRequest().getIdShowing());
        if(result != 0)
            isSuccess = true;
        return isSuccess;
    }

}
