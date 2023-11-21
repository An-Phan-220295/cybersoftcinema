package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.request.MovieRequest;
import com.cybersoft.cybersoftcinema.payload.response.*;
import com.cybersoft.cybersoftcinema.service.MovieService;
import com.cybersoft.cybersoftcinema.service.imp.MovieServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    MovieServiceImp movieServiceImp;

    @PostMapping("movie/add")
    public ResponseEntity<?> insertMovie(@RequestParam int idStatus, @RequestParam MultipartFile image, @RequestParam String name,
                                         @RequestParam int rating, @RequestParam int requireAge, @RequestParam int duration,
                                         @RequestParam int[] idMovieType, @RequestParam int[] idPerson,
                                         @RequestParam int[] idProducer, @RequestParam int idCountry, @RequestParam Date releaseDate,
                                         @RequestParam String content, @RequestParam String trailer) throws IOException {
        boolean isSuccess = movieServiceImp.insertMovie(idStatus, image, name, rating, requireAge, duration, idMovieType,
                                                        idPerson, idProducer, idCountry, releaseDate, content, trailer);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Inserted Movie");
        baseResponse.setData(isSuccess);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/movie")
    public ResponseEntity<?> getAllMovie () throws IOException {
        List<MovieResponse> list = movieServiceImp.getAllMovie();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/movie/type")
    public ResponseEntity<?> getAllMovieType () {
        List<MovieTypeResponse> list = movieServiceImp.getAllMovieType();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/movie/person")
    public ResponseEntity<?> getAllPerson () {
        List<PersonResponse> list = movieServiceImp.getAllPerson();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/movie/producer")
    public ResponseEntity<?> getAllProducer () {
        List<ProducerResponse> list = movieServiceImp.getAllProducer();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/movie/country")
    public ResponseEntity<?> getAllCountry () {
        List<CountryResponse> list = movieServiceImp.getAllCountry();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/movie/moviestatus")
    public ResponseEntity<?> getAllMovieStatus () {
        List<MovieStatusResponse> list = movieServiceImp.getAllMovieStatus();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PutMapping("/movie/edit")
    public ResponseEntity<?> editMovie(int id, int idStatus, MultipartFile image, String name, int rating, int requireAge,
                                       int duration, int[] idMovieType, int[] idPerson, int[] idProducer, int idCountry,
                                       Date releaseDate, String content, String trailer) throws IOException {
        boolean isSuccess = movieServiceImp.editMovie(id, idStatus, image, name, rating, requireAge, duration, idMovieType,
                idPerson, idProducer, idCountry, releaseDate, content, trailer);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Updated Movie");
        baseResponse.setData(isSuccess);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @DeleteMapping("/movie/delete")
    public ResponseEntity<?> deleteMovieById(@RequestParam int movieId) {
        boolean isSuccess = movieServiceImp.deleteMovieById(movieId);
        BaseResponse baseResponse = new BaseResponse();
        if (isSuccess == true) {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Successfully");
            baseResponse.setData(isSuccess);
        } else {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Fail");
            baseResponse.setData(isSuccess);
        }
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
    @GetMapping("/movie/findbyid")
    public ResponseEntity<?> getMovie(@RequestParam int idMovie) throws IOException {
        List<MovieResponse> movieResponseList = movieServiceImp.getMovie(idMovie);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(movieResponseList);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
