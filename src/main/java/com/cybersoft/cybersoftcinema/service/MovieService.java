package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.*;
import com.cybersoft.cybersoftcinema.entity.CountryEntity;
import com.cybersoft.cybersoftcinema.entity.MovieEntity;
import com.cybersoft.cybersoftcinema.entity.MoviePersonProducerMovieTypeEntity;
import com.cybersoft.cybersoftcinema.entity.MovieStatusEntity;
import com.cybersoft.cybersoftcinema.entity.compositeKey.MoviePersonProducerMovieTypeKey;
import com.cybersoft.cybersoftcinema.payload.request.MovieRequest;
import com.cybersoft.cybersoftcinema.payload.response.*;
import com.cybersoft.cybersoftcinema.repository.*;
import com.cybersoft.cybersoftcinema.service.imp.MovieServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService implements MovieServiceImp {

    @Value("${root.folder}")
    private String rootFolder;

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private MoviePersonProducerMovieTypeRepository moviePersonProducerMovieTypeRepository;
    @Autowired
    private MovieTheaterShowRepository movieTheaterShowRepository;
    @Autowired
    private MovieTypeRepository movieTypeRepository;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private ProducerRepository producerRepository;
    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private MovieStatusRepository movieStatusRepository;

//    @Override
//    public boolean insertMovie(String name, int requireAge, int duration, int idCountry, Date releaseDate,
//                               String content, MultipartFile file, int idMovieStatus) throws IOException {
//
//        String pathImage = rootFolder + "\\" + file.getOriginalFilename();
//
//        Path path = Paths.get(rootFolder);
//        Path pathImageCopy = Paths.get(pathImage);
//        if (!Files.exists(path)) {
//            Files.createDirectory(path);
//        }
//        Files.copy(file.getInputStream(), pathImageCopy, StandardCopyOption.REPLACE_EXISTING);
//
//        MovieEntity movieEntity = new MovieEntity();
//        movieEntity.setName(name);
//        movieEntity.setRequiredAge(requireAge);
//        movieEntity.setDuration(duration);
//
//        CountryEntity countryEntity = new CountryEntity();
//        countryEntity.setId(idCountry);
//        movieEntity.setCountryEntity(countryEntity);
//
//        movieEntity.setReleaseDate(releaseDate);
//        movieEntity.setContent(content);
//
//        movieEntity.setImages(file.getOriginalFilename());
//
//        MovieStatusEntity movieStatusEntity = new MovieStatusEntity();
//        movieStatusEntity.setId(idMovieStatus);
//        movieEntity.setMovieStatusEntity(movieStatusEntity);
//
//        movieRepository.save(movieEntity);
//        if(movieEntity != null) {
//            System.out.println("Thêm thành công");
//            return true;
//        }
//        return false;
//    }

    @Override
    public boolean insertMovie(int idStatus, MultipartFile image, String name, int rating,
                               int requireAge, int duration, int[] idMovieType,
                               int[] idPerson, int[] idProducer, int idCountry,
                               Date releaseDate, String content, String trailer) throws IOException {

        String pathImage = rootFolder + "\\" + image.getOriginalFilename();

        Path path = Paths.get(rootFolder);
        Path pathImageCopy = Paths.get(pathImage);
        if (!Files.exists(path)) {
            Files.createDirectory(path);
        }
        Files.copy(image.getInputStream(), pathImageCopy, StandardCopyOption.REPLACE_EXISTING);

        MovieEntity movieEntity = new MovieEntity();
        movieEntity.setName(name);
        movieEntity.setRating(rating);
        movieEntity.setRequiredAge(requireAge);
        movieEntity.setDuration(duration);
        movieEntity.setReleaseDate(releaseDate);
        movieEntity.setContent(content);
        movieEntity.setImages(image.getOriginalFilename());
        movieEntity.setTrailer(trailer);

        CountryEntity countryEntity = new CountryEntity();
        countryEntity.setId(idCountry);
        movieEntity.setCountryEntity(countryEntity);

        MovieStatusEntity movieStatusEntity = new MovieStatusEntity();
        movieStatusEntity.setId(idStatus);
        movieEntity.setMovieStatusEntity(movieStatusEntity);

        movieRepository.save(movieEntity);

        MoviePersonProducerMovieTypeEntity moviePersonProducerMovieTypeEntity = new MoviePersonProducerMovieTypeEntity();
        MovieEntity lastMovie = movieRepository.findFirstByOrderByIdDesc();
        moviePersonProducerMovieTypeEntity.setMovieEntity(lastMovie);
        System.out.println(lastMovie.getId());
        for (int dataPerson : idPerson) {
            PersonEntity personEntity = new PersonEntity();
            personEntity.setId(dataPerson);
            moviePersonProducerMovieTypeEntity.setPersonEntity(personEntity);
            for (int dataProducer : idProducer) {
                ProducerEntity producerEntity = new ProducerEntity();
                producerEntity.setId(dataProducer);
                moviePersonProducerMovieTypeEntity.setProducerEntity(producerEntity);
                for (int dataMovieType : idMovieType) {
                    MovieTypeEntity movieTypeEntity = new MovieTypeEntity();
                    movieTypeEntity.setId(dataMovieType);
                    moviePersonProducerMovieTypeEntity.setMovieTypeEntity(movieTypeEntity);

                    MoviePersonProducerMovieTypeKey moviePersonProducerMovieTypeKey = new MoviePersonProducerMovieTypeKey();
                    moviePersonProducerMovieTypeKey.setIdMovie(lastMovie.getId());
                    moviePersonProducerMovieTypeKey.setIdMovieType(movieTypeEntity.getId());
                    moviePersonProducerMovieTypeKey.setIdPerson(personEntity.getId());
                    moviePersonProducerMovieTypeKey.setIdProducer(producerEntity.getId());
                    moviePersonProducerMovieTypeEntity.setMoviePersonProducerMovieTypeKey(moviePersonProducerMovieTypeKey);


                    moviePersonProducerMovieTypeRepository.save(moviePersonProducerMovieTypeEntity);
                }
            }
        }
//        }

        if (movieEntity != null) {
            System.out.println("Thêm thành công");
            return true;
        }
        return false;
    }

    @Override
    public byte[] getMovieImage(String imageName) throws IOException {
        String imagePath = rootFolder + "\\" + imageName;
        byte[] images = Files.readAllBytes(new File(imagePath).toPath());

        return images;
    }

    @Override
    public List<MovieResponse> getMovie(int idMovie) throws IOException {
        List<MovieResponse> list = new ArrayList<>();

        List<MoviePersonProducerMovieTypeEntity> moviePersonProducerMovieTypeEntities = moviePersonProducerMovieTypeRepository.findAll();

        MovieResponse movieResponse = null;

        for (MoviePersonProducerMovieTypeEntity data : moviePersonProducerMovieTypeEntities) {
            if (data.getMovieEntity().getId() == idMovie) {
                if (movieResponse == null) {
                    movieResponse = new MovieResponse();
                    movieResponse.setId(data.getMovieEntity().getId());
                    movieResponse.setName(data.getMovieEntity().getName());
                    movieResponse.setRating(data.getMovieEntity().getRating());
                    movieResponse.setRequireAge(data.getMovieEntity().getRequiredAge());
                    movieResponse.setDuration(data.getMovieEntity().getDuration());
                    movieResponse.setReleaseDate(data.getMovieEntity().getReleaseDate());
                    movieResponse.setContent(data.getMovieEntity().getContent());

                    movieResponse.setMovieType(new ArrayList<>());
                    movieResponse.setDirector(new ArrayList<>());
                    movieResponse.setCast(new ArrayList<>());
                    movieResponse.setProducer(new ArrayList<>());

                    movieResponse.setCountry(data.getMovieEntity().getCountryEntity().getName());
                    movieResponse.setMovieStatus(data.getMovieEntity().getMovieStatusEntity().getName());

                    movieResponse.setImage(ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/movie/image/") // get http://localhost:8080/movie/image/
                            .path(data.getMovieEntity().getImages()) //get image name
                            .toUriString()); // convert to String
                    list.add(movieResponse);
                }
                //Check N/A data of table Person
                if (!data.getPersonEntity().getName().equals("N/A")) {
                    if (data.getPersonEntity().getPersonTypeEntity().getName().equals("Director")) {
                        if (!movieResponse.getDirector().contains(data.getPersonEntity().getName())) {
                            movieResponse.getDirector().add(data.getPersonEntity().getName());
                        }
                    }
                    if (data.getPersonEntity().getPersonTypeEntity().getName().equals("Actor")) {
                        if (!movieResponse.getCast().contains(data.getPersonEntity().getName())) {
                            movieResponse.getCast().add(data.getPersonEntity().getName());
                        }
                    }
                }
                //Check N/A data of table movieType
                if (!data.getMovieTypeEntity().getName().equals("N/A")) {
                    if (!movieResponse.getMovieType().contains(data.getMovieTypeEntity().getName())) {
                        movieResponse.getMovieType().add(data.getMovieTypeEntity().getName());
                    }
                }
                //Check N/A data of table Producer
                if (!data.getProducerEntity().getName().equals("N/A")) {
                    if (!movieResponse.getProducer().contains(data.getProducerEntity().getName())) {
                        movieResponse.getProducer().add(data.getProducerEntity().getName());
                    }
                }
            }
        }
        return list;
    }

    @Override
    public List<MovieResponse> getMovieByName(String movieName) {
        List<MovieResponse> list = new ArrayList<>();

        List<MoviePersonProducerMovieTypeEntity> moviePersonProducerMovieTypeEntities = moviePersonProducerMovieTypeRepository.findAll();

        MovieResponse movieResponse = null;

        for (MoviePersonProducerMovieTypeEntity data : moviePersonProducerMovieTypeEntities) {
            if (data.getMovieEntity().getName().equals(movieName)) {
                if (movieResponse == null) {
                    movieResponse = new MovieResponse();
                    movieResponse.setId(data.getMovieEntity().getId());
                    movieResponse.setName(data.getMovieEntity().getName());
                    movieResponse.setRating(data.getMovieEntity().getRating());
                    movieResponse.setRequireAge(data.getMovieEntity().getRequiredAge());
                    movieResponse.setDuration(data.getMovieEntity().getDuration());
                    movieResponse.setReleaseDate(data.getMovieEntity().getReleaseDate());
                    movieResponse.setContent(data.getMovieEntity().getContent());
                    movieResponse.setTrailer(data.getMovieEntity().getTrailer());

                    movieResponse.setMovieType(new ArrayList<>());
                    movieResponse.setDirector(new ArrayList<>());
                    movieResponse.setCast(new ArrayList<>());
                    movieResponse.setProducer(new ArrayList<>());

                    movieResponse.setCountry(data.getMovieEntity().getCountryEntity().getName());
                    movieResponse.setMovieStatus(data.getMovieEntity().getMovieStatusEntity().getName());

                    movieResponse.setImage(ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/movie/image/") // get http://localhost:8080/movie/image/
                            .path(data.getMovieEntity().getImages()) //get image name
                            .toUriString()); // convert to String

                    list.add(movieResponse);
                }
                //Check N/A data of table Person
                if (!data.getPersonEntity().getName().equals("N/A")) {
                    if (data.getPersonEntity().getPersonTypeEntity().getName().equals("Director")) {
                        if (!movieResponse.getDirector().contains(data.getPersonEntity().getName())) {
                            movieResponse.getDirector().add(data.getPersonEntity().getName());
                        }
                    }
                    if (data.getPersonEntity().getPersonTypeEntity().getName().equals("Actor")) {
                        if (!movieResponse.getCast().contains(data.getPersonEntity().getName())) {
                            movieResponse.getCast().add(data.getPersonEntity().getName());
                        }
                    }
                }
                //Check N/A data of table movieType
                if (!data.getMovieTypeEntity().getName().equals("N/A")) {
                    if (!movieResponse.getMovieType().contains(data.getMovieTypeEntity().getName())) {
                        movieResponse.getMovieType().add(data.getMovieTypeEntity().getName());
                    }
                }
                //Check N/A data of table Producer
                if (!data.getProducerEntity().getName().equals("N/A")) {
                    if (!movieResponse.getProducer().contains(data.getProducerEntity().getName())) {
                        movieResponse.getProducer().add(data.getProducerEntity().getName());
                    }
                }
            }
        }
        return list;
    }

    @Override
    public List<MovieResponse> getAllShowingMoviePoster() {
        List<MovieResponse> list = new ArrayList<>();
        List<MovieEntity> listMovie = movieTheaterShowRepository.findMovieName();

        for (MovieEntity data : listMovie) {
            MovieResponse movieResponse = new MovieResponse();
            movieResponse.setId(data.getId());
            movieResponse.setName(data.getName());
            movieResponse.setRequireAge(data.getRequiredAge());
            movieResponse.setContent(data.getContent());
            movieResponse.setReleaseDate(data.getReleaseDate());

            movieResponse.setImage(ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/movie/image/")
                    .path(data.getImages())
                    .toUriString());
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<MovieResponse> getAllUpcomingMoviePoster() {
        List<MovieResponse> list = new ArrayList<>();
        List<MovieEntity> listMovie = movieTheaterShowRepository.findByIdMovieStatus();

        for (MovieEntity data : listMovie) {
            MovieResponse movieResponse = new MovieResponse();
            movieResponse.setId(data.getId());
            movieResponse.setName(data.getName());
            movieResponse.setRequireAge(data.getRequiredAge());
            movieResponse.setContent(data.getContent());
            movieResponse.setReleaseDate(data.getReleaseDate());
            movieResponse.setImage(ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/movie/image/")
                    .path(data.getImages())
                    .toUriString());
            list.add(movieResponse);
        }
        return list;
    }

    @Override
    public List<MovieResponse> getAllMovie() throws IOException {
        List<MovieResponse> list = new ArrayList<>();

        List<MoviePersonProducerMovieTypeEntity> moviePersonProducerMovieTypeEntities = moviePersonProducerMovieTypeRepository.findAllMovie();

        MovieResponse movieResponse = null;
        int currentIdMovie = 0;

        for (MoviePersonProducerMovieTypeEntity data : moviePersonProducerMovieTypeEntities) {
            if (data.getMovieEntity().getId() != currentIdMovie) {
                movieResponse = null;
            }
            if (movieResponse == null) {
                movieResponse = new MovieResponse();
                movieResponse.setId(data.getMovieEntity().getId());
                movieResponse.setName(data.getMovieEntity().getName());
                movieResponse.setRating(data.getMovieEntity().getRating());
                movieResponse.setRequireAge(data.getMovieEntity().getRequiredAge());
                movieResponse.setDuration(data.getMovieEntity().getDuration());
                movieResponse.setReleaseDate(data.getMovieEntity().getReleaseDate());
                movieResponse.setContent(data.getMovieEntity().getContent());

                movieResponse.setMovieType(new ArrayList<>());
                movieResponse.setDirector(new ArrayList<>());
                movieResponse.setCast(new ArrayList<>());
                movieResponse.setProducer(new ArrayList<>());

                movieResponse.setCountry(data.getMovieEntity().getCountryEntity().getName());
                movieResponse.setMovieStatus(data.getMovieEntity().getMovieStatusEntity().getName());
                movieResponse.setTrailer(data.getMovieEntity().getTrailer());

                movieResponse.setImage(ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/movie/image/") // get http://localhost:8080/movie/image/
                        .path(data.getMovieEntity().getImages()) //get image name
                        .toUriString()); // convert to String
                list.add(movieResponse);
                currentIdMovie = data.getMovieEntity().getId();
            }
            //Check N/A data of table Person
            if (!data.getPersonEntity().getName().equals("N/A")) {
                if (data.getPersonEntity().getPersonTypeEntity().getName().equals("Director")) {
                    if (!movieResponse.getDirector().contains(data.getPersonEntity().getName())) {
                        movieResponse.getDirector().add(data.getPersonEntity().getName());
                    }
                }
                if (data.getPersonEntity().getPersonTypeEntity().getName().equals("Actor")) {
                    if (!movieResponse.getCast().contains(data.getPersonEntity().getName())) {
                        movieResponse.getCast().add(data.getPersonEntity().getName());
                    }
                }
            }
            //Check N/A data of table movieType
            if (!data.getMovieTypeEntity().getName().equals("N/A")) {
                if (!movieResponse.getMovieType().contains(data.getMovieTypeEntity().getName())) {
                    movieResponse.getMovieType().add(data.getMovieTypeEntity().getName());
                }
            }
            //Check N/A data of table Producer
            if (!data.getProducerEntity().getName().equals("N/A")) {
                if (!movieResponse.getProducer().contains(data.getProducerEntity().getName())) {
                    movieResponse.getProducer().add(data.getProducerEntity().getName());
                }
            }
        }
        return list;
    }

    @Override
    public List<MovieTypeResponse> getAllMovieType() {
        List<MovieTypeResponse> list = new ArrayList<>();
        List<MovieTypeEntity> movieEntityList = movieTypeRepository.findAll();
        for (MovieTypeEntity data : movieEntityList) {
            MovieTypeResponse movieTypeResponse = new MovieTypeResponse();
            movieTypeResponse.setId(data.getId());
            movieTypeResponse.setName(data.getName());
            list.add(movieTypeResponse);
        }
        return list;
    }

    @Override
    public List<PersonResponse> getAllPerson() {
        List<PersonResponse> list = new ArrayList<>();
        List<PersonEntity> personEntityList = personRepository.findAll();
        for (PersonEntity data : personEntityList) {
            PersonResponse personResponse = new PersonResponse();
            personResponse.setId(data.getId());
            personResponse.setName(data.getName());
            personResponse.setDob(data.getDob());
            if (data.getCountryEntity() != null){
                personResponse.setCountry(data.getCountryEntity().getName());
            }
            if (data.getPersonTypeEntity() != null){
                personResponse.setPersonType(data.getPersonTypeEntity().getName());
            }
            personResponse.setPicture(ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/movie/image/") // get http://localhost:8080/movie/image/
                    .path(data.getPicture()) //get image name
                    .toUriString()); // convert to String
            personResponse.setStory(data.getStory());

            list.add(personResponse);
        }
        return list;
    }

    @Override
    public List<ProducerResponse> getAllProducer() {
        List<ProducerResponse> list = new ArrayList<>();
        List<ProducerEntity> producerEntityList = producerRepository.findAll();
        for (ProducerEntity data : producerEntityList) {
            ProducerResponse producerResponse = new ProducerResponse();
            producerResponse.setId(data.getId());
            producerResponse.setName(data.getName());
            list.add(producerResponse);
        }
        return list;
    }

    @Override
    public List<CountryResponse> getAllCountry() {
        List<CountryResponse> list = new ArrayList<>();
        List<CountryEntity> countryEntityList = countryRepository.findAll();
        for (CountryEntity data : countryEntityList) {
            CountryResponse countryResponse = new CountryResponse();
            countryResponse.setId(data.getId());
            countryResponse.setName(data.getName());
            list.add(countryResponse);
        }
        return list;
    }

    @Override
    public List<MovieStatusResponse> getAllMovieStatus() {
        List<MovieStatusResponse> list = new ArrayList<>();
        List<MovieStatusEntity> movieStatusEntityList = movieStatusRepository.findAll();
        for (MovieStatusEntity data : movieStatusEntityList) {
            MovieStatusResponse movieStatusResponse = new MovieStatusResponse();
            movieStatusResponse.setId(data.getId());
            movieStatusResponse.setName(data.getName());
            list.add(movieStatusResponse);
        }
        return list;
    }
}
