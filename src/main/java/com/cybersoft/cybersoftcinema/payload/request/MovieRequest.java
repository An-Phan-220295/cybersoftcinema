package com.cybersoft.cybersoftcinema.payload.request;

import com.cybersoft.cybersoftcinema.entity.MovieTypeEntity;
import com.cybersoft.cybersoftcinema.entity.PersonEntity;
import com.cybersoft.cybersoftcinema.entity.ProducerEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
public class MovieRequest {
    private int idStatus;
    private MultipartFile image;
    private String name;
    private int rating;
    private int requireAge;
    private int duration;
    private int[] idMovieType;
    private int[] idPerson;
    private int[] idProducer;
    private int idCountry;
    private Date releaseDate;
    private String content;
    private String trailer;
}
