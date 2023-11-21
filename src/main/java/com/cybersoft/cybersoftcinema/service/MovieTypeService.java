package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.MovieTypeEntity;
import com.cybersoft.cybersoftcinema.payload.response.MovieTypeResponse;
import com.cybersoft.cybersoftcinema.repository.MovieTypeRepository;
import com.cybersoft.cybersoftcinema.service.imp.MovieTypeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieTypeService implements MovieTypeServiceImp {

    @Autowired
    private MovieTypeRepository movieTypeRepository;

    @Override
    public List<MovieTypeResponse> getAllMovietype() {

        List<MovieTypeEntity> list = movieTypeRepository.findAll();

        List<MovieTypeResponse> responseList = new ArrayList<>();

        for (MovieTypeEntity item : list){
            MovieTypeResponse movieTypeResponse = new MovieTypeResponse();
            movieTypeResponse.setId(item.getId());
            movieTypeResponse.setName(item.getName());
            responseList.add(movieTypeResponse);
        }
        return responseList;
    }
}
