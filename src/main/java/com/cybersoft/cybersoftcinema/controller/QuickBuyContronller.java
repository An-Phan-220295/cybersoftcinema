package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.response.QuickBuyMovieResponse;
import com.cybersoft.cybersoftcinema.repository.MovieTheaterShowRepository;
import com.cybersoft.cybersoftcinema.service.imp.QuickBuyServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;



@RestController
@RequestMapping("/quickbuy")
@CrossOrigin
public class QuickBuyContronller {

    @Autowired
    private QuickBuyServiceImp quickBuyServiceImp;

    @Autowired
    private MovieTheaterShowRepository movieTheaterShowRepository;

    @GetMapping("/movies")
    public ResponseEntity<?> findAllMovieName() {
        movieTheaterShowRepository.setTimezone();
        List<QuickBuyMovieResponse> movies = quickBuyServiceImp.getAllMovie();
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(movies);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/movie/theater")
    public ResponseEntity<?> findTheaterByMovie(@RequestParam int movieId) {
        List<QuickBuyMovieResponse> theater = quickBuyServiceImp.getTheaterByMovie(movieId);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(theater);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/movie/date")
    public ResponseEntity<?> findShowingDateByTheaterAndMovie(@RequestParam int movieId, @RequestParam int theaterId) {
        List<QuickBuyMovieResponse> showingDate = quickBuyServiceImp.getShowingDateByMovieAndTheater(movieId, theaterId);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(showingDate);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/date")
    public ResponseEntity<?> getAllDate(){
        movieTheaterShowRepository.setTimezone();
        List<QuickBuyMovieResponse> showingDate = quickBuyServiceImp.getAllDate();
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(showingDate);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
    @GetMapping("/date/theater")
    public ResponseEntity<?> findTheaterByDate(@RequestParam Date showingDate) {
        List<QuickBuyMovieResponse> theater = quickBuyServiceImp.getTheaterByDate(showingDate);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(theater);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/date/movies")
    public ResponseEntity<?> findMovieByDateAndTheater(@RequestParam Date showingDate, @RequestParam int theaterId) {
        movieTheaterShowRepository.setTimezone();
        List<QuickBuyMovieResponse> movies = quickBuyServiceImp.getMovieByDateAndTheater(showingDate,theaterId);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(movies);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/theater")
    public ResponseEntity<?> getAllTheater() {
        List<QuickBuyMovieResponse> theater = quickBuyServiceImp.getAllTheater();
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(theater);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/theater/movie")
    public ResponseEntity<?> findMovieEByTheater(@RequestParam int theaterId) {
        List<QuickBuyMovieResponse> theater = quickBuyServiceImp.findMovieByTheater(theaterId);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(theater);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/time")
    public ResponseEntity<?> findShowingTimeByTheaterAndMovieAndDate(@RequestParam int movieId, @RequestParam int theaterId, @RequestParam Date showingDate) {
        List<QuickBuyMovieResponse> showingTime = quickBuyServiceImp.getShowingTimeByMovieAndTheaterAndDate(movieId, theaterId, showingDate);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(showingTime);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

}
