package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.request.SeatInfoRequest;
import com.cybersoft.cybersoftcinema.payload.response.PriceResponse;
import com.cybersoft.cybersoftcinema.payload.response.SeatUnavailableResponse;
import com.cybersoft.cybersoftcinema.payload.response.ShowingResponse;
import com.cybersoft.cybersoftcinema.service.imp.GetPriceServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.SeatServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/seat")
public class AdminSeatController {

    @Autowired
    private SeatServiceImp seatServiceImp;

    @Autowired
    private GetPriceServiceImp priceServiceImp;

    @GetMapping("/getunavalableseat")
    public ResponseEntity<?> findUnavalableSeat(@RequestParam int movieId, @RequestParam int theaterId, @RequestParam int showingId) {
        List<SeatUnavailableResponse> seatUnavailableRespons = seatServiceImp.findUnavalableSeat(movieId, theaterId, showingId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(seatUnavailableRespons);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
    @PostMapping("/getprice")
    public ResponseEntity<?> getPrice(@RequestBody SeatInfoRequest seatInfoRequest) {
        PriceResponse priceResponses = priceServiceImp.getPriceByDateAndTime(seatInfoRequest);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(priceResponses);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
    @GetMapping("/countseatsold")
    public ResponseEntity<?> countSeatSold(@RequestParam int movieId, @RequestParam int theaterId, @RequestParam int showingId,@RequestParam int seatTypeId) {
        long result = priceServiceImp.countSeatSold(movieId, theaterId, showingId, seatTypeId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(result);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
