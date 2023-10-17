package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;
import org.springframework.stereotype.Service;

import java.util.List;

public interface MovieServiceImp {
    List<MovieResponse> getMovie(int idMovie);
}
