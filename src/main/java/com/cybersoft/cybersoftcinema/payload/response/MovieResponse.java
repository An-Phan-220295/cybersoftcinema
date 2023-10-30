package com.cybersoft.cybersoftcinema.payload.response;

import java.util.Date;
import java.util.List;

public class MovieResponse {
    private String name;
    private double rating;
    private int requireAge;
    private int duration;
    private List<String> movieType;
    private List<String> director;
    private List<String> cast;
    private List<String> producer;
    private String country;
    private Date releaseDate;
    private String content;
    private String image;
    private String movieStatus;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getRequireAge() {
        return requireAge;
    }

    public void setRequireAge(int requireAge) {
        this.requireAge = requireAge;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public List<String> getMovieType() {
        return movieType;
    }

    public void setMovieType(List<String> movieType) {
        this.movieType = movieType;
    }

    public List<String> getDirector() {
        return director;
    }

    public void setDirector(List<String> director) {
        this.director = director;
    }

    public List<String> getCast() {
        return cast;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }

    public List<String> getProducer() {
        return producer;
    }

    public void setProducer(List<String> producer) {
        this.producer = producer;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getMovieStatus() {
        return movieStatus;
    }

    public void setMovieStatus(String movieStatus) {
        this.movieStatus = movieStatus;
    }
}
