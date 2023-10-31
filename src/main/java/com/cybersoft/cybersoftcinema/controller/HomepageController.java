package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import com.cybersoft.cybersoftcinema.repository.MovieRepository;
import com.cybersoft.cybersoftcinema.repository.MovieTheaterShowRepository;
import com.cybersoft.cybersoftcinema.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/index")
public class HomepageController {

    @Autowired
    MovieTheaterShowRepository movieTheaterShowRepository;

    @Autowired
    MovieService movieService;

    @GetMapping("/poster")
    public ResponseEntity<?> getAllMoviePoster() {
        List<MovieResponse> moviePosterList =  movieService.getAllMoviePoster();
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(moviePosterList);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
