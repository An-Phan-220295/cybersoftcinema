package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.PersonTypeEntity;
import com.cybersoft.cybersoftcinema.payload.response.AdminPersonResponse;
import com.cybersoft.cybersoftcinema.payload.response.AdminPersonTypeResponse;
import com.cybersoft.cybersoftcinema.repository.PersonTypeRepository;
import com.cybersoft.cybersoftcinema.service.imp.PersonTypeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonTypeService implements PersonTypeServiceImp {

    @Autowired
    private PersonTypeRepository personTypeRepository;

    @Override
    public List<AdminPersonTypeResponse> getAllPersonType() {
        List<PersonTypeEntity> personTypeEntities = personTypeRepository.findAll();
        List<AdminPersonTypeResponse> list = new ArrayList<>();
        for (PersonTypeEntity data:personTypeEntities) {
            AdminPersonTypeResponse response = new AdminPersonTypeResponse();
            response.setPersonTypeId(data.getId());
            response.setPersonTypeName(data.getName());
            list.add(response);
        }
        return list;
    }
}
