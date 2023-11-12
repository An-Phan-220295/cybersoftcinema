package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.MovieEntity;
import com.cybersoft.cybersoftcinema.entity.ShowingEntity;
import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import com.cybersoft.cybersoftcinema.payload.response.QuickBuyMovieResponse;
import com.cybersoft.cybersoftcinema.payload.response.ShowResponse;
import com.cybersoft.cybersoftcinema.payload.response.TheaterResponse;
import com.cybersoft.cybersoftcinema.repository.MovieTheaterShowRepository;
import com.cybersoft.cybersoftcinema.repository.TheaterRepository;
import com.cybersoft.cybersoftcinema.service.imp.TheaterServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TheaterService implements TheaterServiceImp {

    @Autowired
    private TheaterRepository theaterRepository;

    @Autowired
    private MovieTheaterShowRepository movieTheaterShowRepository;

    @Override
    public List<TheaterResponse> getAllTheater() {
        List<TheaterResponse> list = new ArrayList<>();
        List<TheaterEntity> theaterList = new ArrayList<>();
        theaterList = theaterRepository.findAll();
        for (TheaterEntity data : theaterList) {
            TheaterResponse theaterResponse = new TheaterResponse();
            theaterResponse.setId(data.getId());
            theaterResponse.setName(data.getName());
            theaterResponse.setAddress(data.getAddress());
            theaterResponse.setContent(data.getContent());
            list.add(theaterResponse);
        }
        return list;
    }

    @Override
    public TheaterResponse getTheaeterById(int id) {
        TheaterResponse theaterResponse = new TheaterResponse();
        TheaterEntity theater = new TheaterEntity();
        Optional<TheaterEntity> theaterEntity = theaterRepository.findById(id);
        if (theaterEntity.isPresent()) {
            theater = theaterEntity.get();
            theaterResponse.setId(theater.getId());
            theaterResponse.setName(theater.getName());
            theaterResponse.setAddress(theater.getAddress());
            theaterResponse.setContent(theater.getContent());
        }
        return theaterResponse;
    }

    @Override
    public List<MovieResponse> getMoviePosterByDateAndTheater(Date showingDate, int theaterId) {
        List<MovieResponse> list = new ArrayList<>();
        List<MovieEntity> listMovie = movieTheaterShowRepository.findMovieEByDateAndTheater(showingDate, theaterId);

        for (MovieEntity data : listMovie) {
            MovieResponse movieResponse = new MovieResponse();
            movieResponse.setId(data.getId());
            movieResponse.setName(data.getName());
            movieResponse.setImage(ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/movie/image/") // get http://localhost:8080/movie/image/
                    .path(data.getImages()) //get image name
                    .toUriString()); // convert to String
            list.add(movieResponse);
        }
        return list;
    }
}
