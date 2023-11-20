package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.entity.PersonEntity;
import com.cybersoft.cybersoftcinema.entity.ProducerEntity;
import com.cybersoft.cybersoftcinema.payload.request.MovieRequest;
import com.cybersoft.cybersoftcinema.payload.response.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

public interface MovieServiceImp {

//    boolean insertMovie(String name, int requireAge, int duration, int idCountry, Date releaseDate, String content,
//                        MultipartFile file, int idMovieStatus) throws IOException;

    boolean insertMovie(int idStatus, MultipartFile image, String name, int rating,
                        int requireAge, int duration, int[] idMovieType,
                        int[] idPerson, int[] idProducer, int idCountry,
                        Date releaseDate, String content, String trailer) throws IOException;

    boolean editMovie(int id, int idStatus, MultipartFile image, String name, int rating,
                        int requireAge, int duration, int[] idMovieType,
                        int[] idPerson, int[] idProducer, int idCountry,
                        Date releaseDate, String content, String trailer) throws IOException;

    byte[] getMovieImage(String imageName) throws IOException;

    List<MovieResponse> getMovie(int idMovie) throws IOException;

    List<MovieResponse> getMovieByName (String movieName);

    List<MovieResponse> getAllShowingMoviePoster();

    List<MovieResponse> getAllUpcomingMoviePoster();

    List<MovieResponse> getAllMovie() throws IOException;

    List<MovieTypeResponse> getAllMovieType();

    List<PersonResponse> getAllPerson() ;

    List<ProducerResponse> getAllProducer();

    List<CountryResponse> getAllCountry();

    List<MovieStatusResponse> getAllMovieStatus();

    boolean deleteMovieById(int movieId);
}
