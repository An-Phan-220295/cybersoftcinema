package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.PersonEntity;
import com.cybersoft.cybersoftcinema.payload.response.PersonResponse;
import com.cybersoft.cybersoftcinema.repository.PersonRepository;
import com.cybersoft.cybersoftcinema.service.imp.PersonServiceImp;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

@Service
public class PersonService implements PersonServiceImp {
    @Value("${root.folder}")
    private String rootFolder;

//    @Value("${host.name}")
//    private String hostName;

    @Autowired
    private PersonRepository personRepository;

    @Override
    public List<PersonResponse> getPersonByPersonType(int id){

        List<PersonEntity> list = personRepository.findByPersonTypeEntityId(id);

        List<PersonResponse> responseList = new ArrayList<>();
        for (PersonEntity item : list){
            PersonResponse personResponse = new PersonResponse();
            personResponse.setId(item.getId());
            personResponse.setName(item.getName());
            personResponse.setStory(item.getStory());
//            personResponse.setPictures(item.getPicture());
            personResponse.setPictures("http://" + rootFolder + "/person/file/" + item.getPicture());

            personResponse.setDob(item.getDob());
            personResponse.setPersonType(item.getPersonTypeEntity().getName());
            personResponse.setCountry(item.getCountryEntity().getName());
            responseList.add(personResponse);
        }


        return responseList;
    }

    @Override
    public List<PersonResponse> getPersonByName(String name) {

        List<PersonEntity> list = personRepository.findByName(name);
        List<PersonResponse> responseList = new ArrayList<>();
        for (PersonEntity data : list){
            PersonResponse response = new PersonResponse();
            response.setId(data.getId());
            response.setName(data.getName());
            response.setStory(data.getStory());
//            personResponse.setPictures(item.getPicture());
            response.setPictures("http://" + rootFolder + "/person/file/" + data.getPicture());

            response.setDob(data.getDob());
            responseList.add(response);
        }
        return responseList;
    }


}
