package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.request.SeatInfoRequest;
import com.cybersoft.cybersoftcinema.payload.response.PriceResponse;
import org.springframework.web.bind.annotation.RequestParam;

public interface GetPriceServiceImp {
    PriceResponse getPriceByDateAndTime(SeatInfoRequest seatInfoRequest);
    long countSeatSold(int movieId, int theaterId, int showingId, int seatTypeId);
}
