package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.response.TicketInfoResponse;
import com.cybersoft.cybersoftcinema.payload.response.UserInfoResponse;
import com.cybersoft.cybersoftcinema.service.imp.SeatServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserServiceImp userServiceImp;

    @Autowired
    private SeatServiceImp seatServiceImp;

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfoById(@RequestParam int userId){
        UserInfoResponse userInfoResponse = userServiceImp.findUserById(userId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(userInfoResponse);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
    @GetMapping("/ticket")
    public ResponseEntity<?> indTicketByUserId(@RequestParam int userId) {
        List<TicketInfoResponse> ticketInfoResponseList = seatServiceImp.findTicketByUserId(userId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(ticketInfoResponseList);
        return new ResponseEntity<>(baseResponse,HttpStatus.OK);
    }
}
