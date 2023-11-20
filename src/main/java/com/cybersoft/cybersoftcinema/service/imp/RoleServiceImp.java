package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.RoleResponse;

import java.util.List;

public interface RoleServiceImp {
    List<RoleResponse> findAllRole();
}
