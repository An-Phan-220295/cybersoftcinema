package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import com.cybersoft.cybersoftcinema.payload.response.QuickBuyMovieResponse;
import com.cybersoft.cybersoftcinema.payload.response.ShowResponse;
import com.cybersoft.cybersoftcinema.service.imp.MovieServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.TicketBookingServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/ticketbooking")
public class TicketBookingController {

    @Autowired
    private MovieServiceImp movieServiceImp;

    @Autowired
    private TicketBookingServiceImp ticketBookingServiceImp;

    @GetMapping("/{movieName}")
    public ResponseEntity<?> getMovieByName(@PathVariable String movieName) {
        List<MovieResponse> movieResponseList = movieServiceImp.getMovieByName(movieName);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(movieResponseList);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/show")
    public ResponseEntity<?> getShowingTimeAndTheaerByMovieAndDate (@RequestParam int idMovie, @RequestParam Date showingDate){
        List<ShowResponse> response = ticketBookingServiceImp.getShowingTimeAndTheaerByMovieAndDate(idMovie, showingDate);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(response);
        return new ResponseEntity<>(baseResponse,HttpStatus.OK);
    }
}
