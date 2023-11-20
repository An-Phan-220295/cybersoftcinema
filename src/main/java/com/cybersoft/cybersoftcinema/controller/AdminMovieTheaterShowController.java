package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.request.*;
import com.cybersoft.cybersoftcinema.payload.response.*;
import com.cybersoft.cybersoftcinema.service.imp.CinemaServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.QuickBuyServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.ShowingServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.TheaterServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@RestController
@RequestMapping("/admin/cinema")
public class AdminMovieTheaterShowController {

    @Autowired
    private ShowingServiceImp showingServiceImp;

    @Autowired
    private TheaterServiceImp theaterServiceImp;

    @Autowired
    private CinemaServiceImp cinemaServiceImp;

    @Autowired
    private QuickBuyServiceImp quickBuyServiceImp;

    @GetMapping("/showing/findall")
    public ResponseEntity<?> findAllShowing() {
        List<ShowingResponse> showingResponseList = showingServiceImp.findAllShowing();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(showingResponseList);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/showing/insert")
    public ResponseEntity<?> insertShowing(@RequestBody ShowingRequest showingRequest) {
        boolean isExist = showingServiceImp.checkExisting(showingRequest);
        BaseResponse baseResponse = new BaseResponse();
        if (isExist == true) {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Existing");
            baseResponse.setData(isExist);
        } else {
            boolean isSuccess = showingServiceImp.insertShowing(showingRequest);
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Successfully");
            baseResponse.setData(isSuccess);
        }
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @DeleteMapping("/showing/delete")
    public ResponseEntity<?> deleteShowing(@RequestParam int showingId) {
        boolean isSuccess = showingServiceImp.deleteShowing(showingId);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Successfully");
        baseResponse.setData(isSuccess);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/theater/findall")
    public ResponseEntity<?> findAllTheater() {
        List<TheaterResponse> theaterList = theaterServiceImp.getAllTheater();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(theaterList);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/theater/insert")
    public ResponseEntity<?> insertTheater(@RequestBody AdminTheaterRequest adminTheaterRequest) {
        boolean isSuccess = theaterServiceImp.insertTheater(adminTheaterRequest);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Successfully");
        baseResponse.setData(isSuccess);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @DeleteMapping("/theater/delete")
    public ResponseEntity<?> deleteTheaterById(@RequestParam int theaterId) {
        boolean isSuccess = theaterServiceImp.deleteTheaterbyId(theaterId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Successfully");
        baseResponse.setData(isSuccess);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/theater/findtheater")
    public ResponseEntity<?> findTheaterById(@RequestParam int theaterId) {
        TheaterResponse theaterResponse = theaterServiceImp.getTheaeterById(theaterId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Successfully");
        baseResponse.setData(theaterResponse);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PutMapping("/theater/update")
    public ResponseEntity<?> updateTheater(@RequestBody AdminTheaterRequest adminTheaterRequest) {
        boolean isSuccess = theaterServiceImp.updateTheater(adminTheaterRequest);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Successfully");
        baseResponse.setData(isSuccess);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> findAllCinema() {
        List<AdminCinemaResponse> adminCinemaResponseList = cinemaServiceImp.findAllCinema();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Successfully");
        baseResponse.setData(adminCinemaResponseList);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/movie")
    public ResponseEntity<?> findAllMovieName() {
        List<QuickBuyMovieResponse> movies = quickBuyServiceImp.getAllMovie();
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(movies);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertCinema(@RequestBody CinemaRequest cinemaRequest) {
        BaseResponse baseResponse = new BaseResponse();
        if (cinemaServiceImp.checkExisting(cinemaRequest)) {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Existing");
            baseResponse.setData("");
        } else {
            boolean isSuccess = cinemaServiceImp.insertCinema(cinemaRequest);
            if (isSuccess) {
                baseResponse.setStatusCode(200);
                baseResponse.setMessage("Successfully");
                baseResponse.setData("");
            } else {
                baseResponse.setStatusCode(200);
                baseResponse.setMessage("Fail");
                baseResponse.setData("");
            }
        }
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/showing/id")
    public ResponseEntity<?> findShowId(@RequestParam Date showingDate, @RequestParam Time startTime) {
        int id = cinemaServiceImp.findIdShowing(showingDate, startTime);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(id);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCinema(@RequestBody CinemaRequest cinemaRequest) {
        boolean isSuccess = cinemaServiceImp.deleteCinema(cinemaRequest);

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

    @GetMapping("/info")
    public ResponseEntity<?> findInfoByIds(@RequestParam int movieId, @RequestParam int theaterId, @RequestParam int showingId) {
        AdminCinemaResponse adminCinemaResponse = cinemaServiceImp.findByAId(movieId, theaterId, showingId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Successfully");
        baseResponse.setData(adminCinemaResponse);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCinema(@RequestBody AdminUpdateCinemaRequest cinemaRequest) {

        BaseResponse baseResponse = new BaseResponse();
        if (cinemaServiceImp.checkExisting(cinemaRequest.getNewCinemaRequest())) {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Existing");
            baseResponse.setData("");
        } else {
            boolean isSuccess = cinemaServiceImp.updateCinema(cinemaRequest);
            if (isSuccess) {
                baseResponse.setStatusCode(200);
                baseResponse.setMessage("Successfully");
                baseResponse.setData("");
            } else {
                baseResponse.setStatusCode(200);
                baseResponse.setMessage("Fail");
                baseResponse.setData("");
            }
        }
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/theater/findbymovie")
    public ResponseEntity<?> findTheaterByMovie(@RequestParam int movieId) {
        List<QuickBuyMovieResponse> list = quickBuyServiceImp.getTheaterByMovie(movieId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(list);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/showing/findbymovieandtheater")
    public ResponseEntity<?> findShowingByTheater(@RequestParam int movieId, @RequestParam int theaterId) {
        List<QuickBuyMovieResponse> showingResponseList = quickBuyServiceImp.getShowingByMovieAndTheater(movieId, theaterId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(showingResponseList);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
