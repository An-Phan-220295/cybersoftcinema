package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.AdminPersonResponse;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

public interface PersonServiceImp {
    byte[] getPersonImage(String imageName) throws IOException;
    List<AdminPersonResponse> findAllPerson();
    boolean deletePersonById( int personId);
    boolean insertPerson(String name, int personTypeId, MultipartFile picture, Date dob, int countryId, String story)
            throws IOException;
    AdminPersonResponse getPersonById(int personId);
    boolean updatePersonById(int personId, String name, int personTypeId, MultipartFile picture
            , Date dob, int countryId, String story) throws IOException;
}