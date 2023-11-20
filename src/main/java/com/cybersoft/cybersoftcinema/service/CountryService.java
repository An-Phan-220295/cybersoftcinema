package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.CountryEntity;
import com.cybersoft.cybersoftcinema.payload.response.AdminCountryResponse;
import com.cybersoft.cybersoftcinema.repository.CountryRepository;
import com.cybersoft.cybersoftcinema.service.imp.CountryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CountryService implements CountryServiceImp {

    @Autowired
    private CountryRepository countryRepository;

    @Override
    public List<AdminCountryResponse> findAllCountry() {
        List<CountryEntity> countryEntities = countryRepository.findAll();
        List<AdminCountryResponse> list = new ArrayList<>() ;
        for (CountryEntity data:countryEntities) {
            AdminCountryResponse adminCountryResponse = new AdminCountryResponse();
            adminCountryResponse.setCountryId(data.getId());
            adminCountryResponse.setCountryName(data.getName());
            list.add(adminCountryResponse);
        }
        return list;
    }
}
