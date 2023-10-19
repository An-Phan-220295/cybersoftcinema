package com.cybersoft.cybersoftcinema.payload.response;

import java.util.List;

public class MovieResponse {
    private String name;
    private String status;
    private String country;
    private List<String> movieType;

    public List<String> getMovieType() {
        return movieType;
    }

    public void setMovieType(List<String> movieType) {
        this.movieType = movieType;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
