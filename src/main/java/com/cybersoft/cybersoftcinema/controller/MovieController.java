package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.request.MovieRequest;
import com.cybersoft.cybersoftcinema.payload.response.*;
import com.cybersoft.cybersoftcinema.service.imp.MovieServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.PersonServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieServiceImp movieServiceImp;

//    @PostMapping("")
//    public ResponseEntity<?> insertMovie(@RequestParam String name, @RequestParam int requireAge, @RequestParam int duration,
//                                         @RequestParam int idCountry, @RequestParam Date releaseDate,
//                                         @RequestParam String content, @RequestParam MultipartFile file,
//                                         @RequestParam int idMovieStatus) throws IOException {
//        boolean isSuccess = movieServiceImp.insertMovie(name, requireAge, duration, idCountry, releaseDate, content, file, idMovieStatus);
//
//        BaseResponse baseResponse = new BaseResponse();
//        baseResponse.setStatusCode(200);
//        baseResponse.setMessage("Inserted Image");
//        baseResponse.setData(isSuccess);
//
//        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
//    }

//    @PostMapping("")
//    public ResponseEntity<?> insertMovie(@RequestBody MovieRequest movieRequest) throws IOException {
//        boolean isSuccess = movieServiceImp.insertMovie(movieRequest);
//
//        BaseResponse baseResponse = new BaseResponse();
//        baseResponse.setStatusCode(200);
//        baseResponse.setMessage("Inserted Movie");
//        baseResponse.setData(isSuccess);
//
//        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
//    }

    @GetMapping("")
    public ResponseEntity<?> getMovie(@RequestParam int idMovie) throws IOException {
        List<MovieResponse> movieResponseList = movieServiceImp.getMovie(idMovie);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Success");
        baseResponse.setData(movieResponseList);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/image/{imageName}")
    public ResponseEntity<?> getMoviePoster (@PathVariable String imageName) throws IOException {
        byte[] image = movieServiceImp.getMovieImage(imageName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }
    @Autowired
    private PersonServiceImp personServiceImp;

    @GetMapping("/person/image/{imageName}")
    public ResponseEntity<?> getPersonPicture(@PathVariable String imageName) throws IOException {
        byte[] image = personServiceImp.getPersonImage(imageName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }


}
