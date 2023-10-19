package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.MovieMovieTypeEntity;
import com.cybersoft.cybersoftcinema.entity.MovieTypeEntity;
import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import com.cybersoft.cybersoftcinema.repository.MovieMovieTypeRepository;
import com.cybersoft.cybersoftcinema.repository.MovieRepository;
import com.cybersoft.cybersoftcinema.service.imp.MovieServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService implements MovieServiceImp {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieMovieTypeRepository movieMovieTypeRepository;

    @Override
    public List<MovieResponse> getMovie(int idMovie) {
//        List<MovieResponse> list = new ArrayList<>();
//        List<MovieMovieTypeEntity> movieMovieTypeEntities = movieMovieTypeRepository.findAll();
//        Optional<MovieMovieTypeEntity> test = movieMovieTypeRepository.findById(idMovie);
//        MovieResponse movieResponse = null;
//
//        for (MovieMovieTypeEntity data : movieMovieTypeEntities) {
//            if (data.getMovieEntity().getId() == idMovie) {
//                if (movieResponse == null) {
//                    movieResponse = new MovieResponse();
//                    movieResponse.setName(data.getMovieEntity().getName());
//                    movieResponse.setCountry(data.getMovieEntity().getCountryEntity().getName());
//                    movieResponse.setStatus(data.getMovieEntity().getMovieStatusEntity().getName());
//                    movieResponse.setMovieType(new ArrayList<>());
//                    list.add(movieResponse);
//                }
//
//                movieResponse.getMovieType().add(data.getMovieTypeEntity().getName());
//            } else {
//                movieResponse = null;
//            }
//        }
//        return list;

        List<MovieResponse> list = new ArrayList<>();
        Optional<MovieMovieTypeEntity> movieMovieTypeEntities = movieMovieTypeRepository.findById(idMovie);
        Optional<MovieMovieTypeEntity> test = movieMovieTypeRepository.findById(idMovie);

        return list;
    }
}
