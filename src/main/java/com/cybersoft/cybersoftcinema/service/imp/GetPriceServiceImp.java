package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.request.SeatInfoRequest;
import com.cybersoft.cybersoftcinema.payload.response.PriceResponse;

public interface GetPriceServiceImp {
    PriceResponse getPriceByDateAndTime(SeatInfoRequest seatInfoRequest);
}
