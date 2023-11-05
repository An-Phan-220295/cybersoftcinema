package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import com.cybersoft.cybersoftcinema.service.imp.MovieServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/datve")
public class DatVeController {

    @Autowired
    private MovieServiceImp movieServiceImp;

    @GetMapping("/{movieName}")
    public ResponseEntity<?> getMovieByName(@PathVariable String movieName) {
        List<MovieResponse> movieResponseList = movieServiceImp.getMovieByName(movieName);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(movieResponseList);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
