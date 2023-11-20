package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.request.SeatInfoRequest;
import com.cybersoft.cybersoftcinema.payload.request.TicketRequest;
import com.cybersoft.cybersoftcinema.payload.response.AdminUserDetailResponse;
import com.cybersoft.cybersoftcinema.payload.response.SeatUnavailableResponse;
import com.cybersoft.cybersoftcinema.payload.response.TicketInfoResponse;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface SeatServiceImp {
    List<SeatUnavailableResponse> findUnavalableSeat(SeatInfoRequest seatInfoRequest);
    boolean buyTicket(List<TicketRequest> ticketRequest);
    List<TicketInfoResponse> findTicketByUserId(int userId);
    List<AdminUserDetailResponse> findSeatById(int userId);
    List<SeatUnavailableResponse> findUnavalableSeat(int movieId,int theaterId,int showingId);

}
