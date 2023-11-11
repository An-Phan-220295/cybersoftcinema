package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.QuickBuyMovieResponse;
import com.cybersoft.cybersoftcinema.payload.response.ShowResponse;

import java.sql.Date;
import java.util.List;

public interface TicketBookingServiceImp {
    List<ShowResponse> getShowingTimeAndTheaerByMovieAndDate(int id, Date showingDate);
}
