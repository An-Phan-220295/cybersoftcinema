package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.PersonResponse;

import java.util.List;

public interface PersonServiceImp {
    List<PersonResponse> getPersonByPersonType(int id);
    List<PersonResponse> getPersonByName(String name);
}
