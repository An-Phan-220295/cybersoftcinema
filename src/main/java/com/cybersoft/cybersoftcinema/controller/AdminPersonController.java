package com.cybersoft.cybersoftcinema.controller;


import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.request.AdminPersonRequest;
import com.cybersoft.cybersoftcinema.payload.request.UpdateUserRequest;
import com.cybersoft.cybersoftcinema.payload.response.AdminPersonResponse;
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
@RequestMapping("/admin/person")
public class AdminPersonController {

    @Autowired
    private PersonServiceImp personServiceImp;


    @GetMapping("")
    public ResponseEntity<?> getAllPerson() {
        List<AdminPersonResponse> list = personServiceImp.findAllPerson();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deletePersonById(@RequestParam int personId) {
        boolean isSuccess = personServiceImp.deletePersonById(personId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Successfully");
        baseResponse.setData(isSuccess);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertPerson(@RequestParam String name, @RequestParam int personTypeId, @RequestParam MultipartFile picture
            , @RequestParam Date dob, @RequestParam int countryId, @RequestParam String story) throws IOException {
        boolean isSuccess = personServiceImp.insertPerson(name, personTypeId, picture, dob, countryId, story);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Successfully");
        baseResponse.setData(isSuccess);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/getperson")
    public ResponseEntity<?> getPersonById(@RequestParam int personId) {
        AdminPersonResponse list = personServiceImp.getPersonById(personId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateUserInfoById(@RequestParam int personId,@RequestParam String name, @RequestParam int personTypeId
            , @RequestParam MultipartFile picture, @RequestParam Date dob, @RequestParam int countryId
            , @RequestParam String story) throws IOException{

        boolean isSuccess = personServiceImp.updatePersonById(personId, name, personTypeId, picture, dob, countryId, story);
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
}
