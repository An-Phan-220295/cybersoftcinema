package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.AdminPersonResponse;
import com.cybersoft.cybersoftcinema.payload.response.PersonResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

public interface PersonServiceImp {
    List<PersonResponse> getPersonByPersonType(int id);

    List<PersonResponse> getPersonByName(String name);

    byte[] getPersonImage(String imageName) throws IOException;

    List<AdminPersonResponse> findAllPerson();

    boolean deletePersonById( int personId);

    boolean insertPerson(String name, int personTypeId, MultipartFile picture, Date dob, int countryId, String story)
            throws IOException;

    AdminPersonResponse getPersonById(int personId);

    boolean updatePersonById(int personId, String name, int personTypeId, MultipartFile picture
            , Date dob, int countryId, String story) throws IOException;
}
