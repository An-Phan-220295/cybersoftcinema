package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.request.SeatInfoRequest;
import com.cybersoft.cybersoftcinema.payload.request.TicketRequest;
import com.cybersoft.cybersoftcinema.payload.response.PriceResponse;
import com.cybersoft.cybersoftcinema.payload.response.SeatUnavailableResponse;
import com.cybersoft.cybersoftcinema.service.imp.GetPriceServiceImp;
import com.cybersoft.cybersoftcinema.service.imp.SeatServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket")
@CrossOrigin
public class BuyTicketController {

    @Autowired
    private SeatServiceImp seatServiceImp;

    @Autowired
    private GetPriceServiceImp priceServiceImp;

    @PostMapping("/getunavalableseat")
    public ResponseEntity<?> findUnavalableSeat(@RequestBody SeatInfoRequest seatInfoRequest) {
        List<SeatUnavailableResponse> seatUnavailableRespons = seatServiceImp.findUnavalableSeat(seatInfoRequest);

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

    @PostMapping("/buyticket")

    public ResponseEntity<?> buyticket(@RequestBody List<TicketRequest> ticketRequest) {
        boolean isSuccess = seatServiceImp.buyTicket(ticketRequest);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("Mua vé thành công");
        baseResponse.setData(isSuccess);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
