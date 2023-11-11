package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import com.cybersoft.cybersoftcinema.payload.response.TheaterResponse;

import java.util.List;
import java.util.Optional;

public interface TheaterServiceImp {
    List<TheaterResponse> getAllTheater ();

    TheaterResponse getTheaeterById(int id);
}
