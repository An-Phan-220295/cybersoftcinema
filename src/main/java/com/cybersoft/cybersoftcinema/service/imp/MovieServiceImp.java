package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.MovieResponse;

import java.util.List;

public interface MovieServiceImp {
    List<MovieResponse> getMovie(int idMovie);
}
