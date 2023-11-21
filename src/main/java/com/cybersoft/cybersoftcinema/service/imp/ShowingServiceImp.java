package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.entity.ShowingEntity;
import com.cybersoft.cybersoftcinema.payload.request.ShowingRequest;
import com.cybersoft.cybersoftcinema.payload.response.ShowingResponse;

import java.util.List;

public interface ShowingServiceImp{
    List<ShowingResponse> findAllShowing();
    boolean insertShowing(ShowingRequest showingRequest);
    boolean checkExisting(ShowingRequest showingRequest);
    boolean deleteShowing(int showingId);
}
