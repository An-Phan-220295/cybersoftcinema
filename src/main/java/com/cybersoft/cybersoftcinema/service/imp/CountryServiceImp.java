package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.AdminCountryResponse;

import java.util.List;

public interface CountryServiceImp {
    List<AdminCountryResponse> findAllCountry();
}
