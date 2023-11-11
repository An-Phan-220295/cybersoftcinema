package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.request.SeatInfoRequest;
import com.cybersoft.cybersoftcinema.payload.request.TicketRequest;
import com.cybersoft.cybersoftcinema.payload.response.SeatUnavailableResponse;

import java.util.List;

public interface SeatServiceImp {
    List<SeatUnavailableResponse> findUnavalableSeat(SeatInfoRequest seatInfoRequest);
    boolean buyTicket(List<TicketRequest> ticketRequest);

}
