package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.entity.MovieEntity;
//import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import com.cybersoft.cybersoftcinema.repository.MovieRepository;
import com.cybersoft.cybersoftcinema.service.imp.MovieServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieServiceImp movieServiceImp;

    @GetMapping("")
    public ResponseEntity<?> getMovie(@RequestParam int idMovie){
        List<MovieResponse> movieResponseList = movieServiceImp.getMovie(idMovie);
        return new ResponseEntity<>(movieResponseList, HttpStatus.OK);
    }
}
