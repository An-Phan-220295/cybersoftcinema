package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.CountryEntity;
import com.cybersoft.cybersoftcinema.entity.PersonEntity;
import com.cybersoft.cybersoftcinema.entity.PersonTypeEntity;
import com.cybersoft.cybersoftcinema.payload.response.AdminPersonResponse;
import com.cybersoft.cybersoftcinema.repository.PersonRepository;
import com.cybersoft.cybersoftcinema.service.imp.PersonServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PersonService implements PersonServiceImp {

    @Value("${root.folder}")
    private String rootFolder;

    @Autowired
    private PersonRepository personRepository;

    @Override
    public byte[] getPersonImage(String imageName) throws IOException {
        String imagePath = rootFolder + "\\" + imageName;
        byte[] images = Files.readAllBytes(new File(imagePath).toPath());

        return images;
    }

    @Override
    public List<AdminPersonResponse> findAllPerson() {
        List<AdminPersonResponse> list = new ArrayList<>();
        List<PersonEntity> personEntities = personRepository.findAll();
        for (PersonEntity data : personEntities) {
            AdminPersonResponse personResponse = new AdminPersonResponse();
            personResponse.setPersonId(data.getId());
            personResponse.setPersonName(data.getName());
            personResponse.setPersonTypeId(data.getPersonTypeEntity().getId());
            personResponse.setPersonTypeName(data.getPersonTypeEntity().getName());
            personResponse.setBirthday(data.getDob());
            personResponse.setCountryId(data.getCountryEntity().getId());
            personResponse.setCountryName(data.getCountryEntity().getName());
            personResponse.setStory(data.getStory());
            personResponse.setPicture(ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/movie/person/image/").path(data.getPicture()).toUriString());
            list.add(personResponse);
        }
        return list;
    }

    @Override
    public boolean deletePersonById(int personId) {
        boolean isSuccess = false;
        try {
            personRepository.deleteById(personId);
            isSuccess = true;
        } catch (Exception e) {
            System.out.println("Delete failed");
        }
        return isSuccess;
    }

    @Override
    public boolean insertPerson(String name, int personTypeId, MultipartFile picture, Date dob, int countryId, String story) throws IOException {
        boolean isSuccess = false;
        String pathPicture = rootFolder + "\\" + picture.getOriginalFilename();
        Path path = Paths.get(rootFolder);
        if (!Files.exists(path)) {
            Files.createDirectory(path);
        }
        Files.copy(picture.getInputStream(), Paths.get(pathPicture), StandardCopyOption.REPLACE_EXISTING);

        PersonEntity personEntity = new PersonEntity();
        personEntity.setName(name);
        personEntity.setPicture(picture.getOriginalFilename());
        personEntity.setDob(dob);

        PersonTypeEntity personTypeEntity = new PersonTypeEntity();
        personTypeEntity.setId(personTypeId);
        personEntity.setPersonTypeEntity(personTypeEntity);

        CountryEntity countryEntity = new CountryEntity();
        countryEntity.setId(countryId);
        personEntity.setCountryEntity(countryEntity);

        personEntity.setStory(story);
        personRepository.save(personEntity);
        isSuccess = true;

        return isSuccess;
    }

    @Override
    public AdminPersonResponse getPersonById(int personId) {
        Optional<PersonEntity> personEntities = personRepository.findById(personId);
        AdminPersonResponse personResponse = new AdminPersonResponse();

        personResponse.setPersonId(personEntities.get().getId());
        personResponse.setPersonName(personEntities.get().getName());
        personResponse.setPersonTypeId(personEntities.get().getPersonTypeEntity().getId());
        personResponse.setPersonTypeName(personEntities.get().getPersonTypeEntity().getName());
        personResponse.setBirthday(personEntities.get().getDob());
        personResponse.setCountryId(personEntities.get().getCountryEntity().getId());
        personResponse.setCountryName(personEntities.get().getCountryEntity().getName());
        personResponse.setStory(personEntities.get().getStory());
        personResponse.setPicture(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/movie/person/image/").path(personEntities.get().getPicture()).toUriString());

        return personResponse;
    }

    @Override
    public boolean updatePersonById(int personId, String name, int personTypeId, MultipartFile picture, Date dob, int countryId, String story) throws IOException {
        boolean isSuccess = false;
        String pathPicture = rootFolder + "\\" + picture.getOriginalFilename();
        Path path = Paths.get(rootFolder);
        if (!Files.exists(path)) {
            Files.createDirectory(path);
        }
        Files.copy(picture.getInputStream(), Paths.get(pathPicture), StandardCopyOption.REPLACE_EXISTING);

        PersonEntity personEntity = new PersonEntity();
        personEntity.setId(personId);
        personEntity.setName(name);
        personEntity.setPicture(picture.getOriginalFilename());
        personEntity.setDob(dob);

        PersonTypeEntity personTypeEntity = new PersonTypeEntity();
        personTypeEntity.setId(personTypeId);
        personEntity.setPersonTypeEntity(personTypeEntity);

        CountryEntity countryEntity = new CountryEntity();
        countryEntity.setId(countryId);
        personEntity.setCountryEntity(countryEntity);

        personEntity.setStory(story);
        personRepository.save(personEntity);
        isSuccess = true;

        return isSuccess;
    }


}
