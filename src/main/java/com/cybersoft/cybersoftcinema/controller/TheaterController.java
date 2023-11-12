package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import com.cybersoft.cybersoftcinema.payload.response.ShowResponse;
import com.cybersoft.cybersoftcinema.payload.response.TheaterResponse;
import com.cybersoft.cybersoftcinema.service.imp.TheaterServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/theater")
public class TheaterController {

    @Autowired
    TheaterServiceImp theaterServiceImp;

    @GetMapping("")
    public ResponseEntity<?> getAllTheater () {
        BaseResponse baseResponse = new BaseResponse();
        List<TheaterResponse> theaterResponses = theaterServiceImp.getAllTheater();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(theaterResponses);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTheaterById(@PathVariable int id) {
        BaseResponse baseResponse = new BaseResponse();
        TheaterResponse theaterEntity = theaterServiceImp.getTheaeterById(id);
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(theaterEntity);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("poster")
    public ResponseEntity<?> getMoviePosterByDateAndTheater(@RequestParam Date date, @RequestParam int theaterId) {
        BaseResponse baseResponse = new BaseResponse();
        List<MovieResponse> movieResponseList = theaterServiceImp.getMoviePosterByDateAndTheater(date, theaterId);
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(movieResponseList);
    return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
