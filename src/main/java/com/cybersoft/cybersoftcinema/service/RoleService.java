package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.RoleEntity;
import com.cybersoft.cybersoftcinema.payload.response.RoleResponse;
import com.cybersoft.cybersoftcinema.repository.RoleRepository;
import com.cybersoft.cybersoftcinema.service.imp.RoleServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleService implements RoleServiceImp {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<RoleResponse> findAllRole() {
        List<RoleEntity> roleEntityList = roleRepository.findAll();
        List<RoleResponse> roleResponses = new ArrayList<>();

        for (RoleEntity data: roleEntityList) {
            RoleResponse roleResponse = new RoleResponse();
            roleResponse.setId(data.getId());
            roleResponse.setName(data.getName());
            roleResponses.add(roleResponse);
        }
        return roleResponses;
    }
}
