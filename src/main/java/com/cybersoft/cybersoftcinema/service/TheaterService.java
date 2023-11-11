package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import com.cybersoft.cybersoftcinema.payload.response.TheaterResponse;
import com.cybersoft.cybersoftcinema.repository.TheaterRepository;
import com.cybersoft.cybersoftcinema.service.imp.TheaterServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TheaterService implements TheaterServiceImp {

    @Autowired
    private TheaterRepository theaterRepository;

    @Override
    public List<TheaterResponse> getAllTheater() {
        List<TheaterResponse> list = new ArrayList<>();
        List<TheaterEntity> theaterList = new ArrayList<>();
        theaterList = theaterRepository.findAll();
        for (TheaterEntity data : theaterList) {
            TheaterResponse theaterResponse = new TheaterResponse();
            theaterResponse.setId(data.getId());
            theaterResponse.setName(data.getName());
            theaterResponse.setAddress(data.getAddress());
            theaterResponse.setContent(data.getContent());
            list.add(theaterResponse);
        }

        return list;
    }

    @Override
    public TheaterResponse getTheaeterById(int id) {
        TheaterResponse theaterResponse = new TheaterResponse();
        TheaterEntity theater = new TheaterEntity();
        Optional<TheaterEntity> theaterEntity = theaterRepository.findById(id);
        if (theaterEntity.isPresent()) {
            theater = theaterEntity.get();
            theaterResponse.setId(theater.getId());
            theaterResponse.setName(theater.getName());
            theaterResponse.setAddress(theater.getAddress());
            theaterResponse.setContent(theater.getContent());
        }
        return theaterResponse;
    }
}
