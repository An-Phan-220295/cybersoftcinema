package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.service.MovieService;
import com.cybersoft.cybersoftcinema.service.imp.MovieServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.MovieTypeServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.PersonServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.PreviewBlogServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/cinema")
public class CinemaController {

    @Autowired
    private PersonServiceImp personServiceImp;

    @Autowired
    private MovieTypeServiceImp movieTypeServiceImp;

    @Autowired
    private PreviewBlogServiceImp previewBlogServiceImp;
    @Autowired
    private MovieServiceImp movieServiceImp;

    @GetMapping("/person/{id}")
    public ResponseEntity<?> getActorOrDirector(@PathVariable int id){
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setMessage("Success");
        response.setData(personServiceImp.getPersonByPersonType(id));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/person/{name}")
    public ResponseEntity<?> getPersonByName(@PathVariable String name){
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setMessage("Success");
        response.setData(personServiceImp.getPersonByName(name));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
//    @GetMapping("/director/{id}")
//    public ResponseEntity<?> getAllDirector(@PathVariable int id){
//        BaseResponse response = new BaseResponse();
//        response.setStatusCode(200);
//        response.setMessage("Success");
//        response.setData(personServiceImp.getAllPerson(id));
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @GetMapping("/movietype")
    public ResponseEntity<?> getAllMovietype(){

        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setMessage("Success");
        response.setData(movieTypeServiceImp.getAllMovietype());
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

//    @GetMapping("/movietype/{id}")
//    public ResponseEntity<?> getMovieByType(@PathVariable int id){
//
//        BaseResponse response = new BaseResponse();
//        response.setStatusCode(200);
//        response.setMessage("Success");
//        response.setData(movieServiceImp.getMovieByMovieTypeId(id));
//        return new ResponseEntity<>(response,HttpStatus.OK);
//    }

    @GetMapping("/previewblog/{id}")
    public ResponseEntity<?> getBlogOrPreview( @PathVariable int id){

        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setMessage("Success");
        response.setData(previewBlogServiceImp.getPreviewBlogByTypePreviewBlogId(id));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

//    @GetMapping("/preview/{id}")
//    public ResponseEntity<?> getAllPreview( @PathVariable int id){
//
//        BaseResponse response = new BaseResponse();
//        response.setStatusCode(200);
//        response.setMessage("Success");
//        response.setData(previewBlogServiceImp.getPreviewBlogByTypePreviewBlogId(id));
//        return new ResponseEntity<>(response,HttpStatus.OK);
//    }


}
