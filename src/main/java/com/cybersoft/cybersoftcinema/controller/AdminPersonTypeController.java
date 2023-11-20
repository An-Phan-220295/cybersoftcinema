package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;

import com.cybersoft.cybersoftcinema.payload.response.AdminPersonTypeResponse;
import com.cybersoft.cybersoftcinema.service.imp.PersonTypeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminPersonTypeController {

    @Autowired
    private PersonTypeServiceImp personTypeServiceImp;

    @GetMapping("/persontype")
    public ResponseEntity<?> getAllPersonType() {
        List<AdminPersonTypeResponse> list = personTypeServiceImp.getAllPersonType();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
