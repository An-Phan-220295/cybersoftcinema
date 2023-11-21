package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.request.AdminUserAddRequest;
import com.cybersoft.cybersoftcinema.payload.request.SignUpRequest;
import com.cybersoft.cybersoftcinema.payload.request.UpdateUserRequest;
import com.cybersoft.cybersoftcinema.payload.response.AdminUserDetailResponse;
import com.cybersoft.cybersoftcinema.payload.response.RoleResponse;
import com.cybersoft.cybersoftcinema.payload.response.TicketInfoResponse;
import com.cybersoft.cybersoftcinema.payload.response.UserInfoResponse;
import com.cybersoft.cybersoftcinema.service.imp.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/user")
@CrossOrigin
public class AdminUserController {
    @Autowired
    private UserServiceImp userServiceImp;

    @Autowired
    private RoleServiceImp roleServiceImp;

    @Autowired
    private LoginServiceImp loginServiceImp;

    @Autowired
    private SeatServiceImp seatServiceImp;

    @GetMapping("/info-list")
    public ResponseEntity<?> findAllUser() {
        List<UserInfoResponse> userInfoResponse = userServiceImp.findAllUser();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(userInfoResponse);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfoById(@RequestParam int userId) {
        UserInfoResponse userInfoResponse = userServiceImp.findUserById(userId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(userInfoResponse);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/role")
    public ResponseEntity<?> findAllRole() {
        List<RoleResponse> roleResponses = roleServiceImp.findAllRole();

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(roleResponses);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PutMapping("/update/info")
    public ResponseEntity<?> updateUserInfoById(@RequestBody UpdateUserRequest updateUserRequest) {
        boolean isSuccess = userServiceImp.updateUserInfo(updateUserRequest);
        BaseResponse baseResponse = new BaseResponse();
        if (isSuccess == true) {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Successfully");
            baseResponse.setData(isSuccess);
        } else {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Fail");
            baseResponse.setData(isSuccess);
        }
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUserInfoById(@RequestParam int userId) {
        boolean isSuccess = userServiceImp.deleteUserById(userId);
        BaseResponse baseResponse = new BaseResponse();
        if (isSuccess == true) {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Successfully");
            baseResponse.setData(isSuccess);
        } else {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Fail");
            baseResponse.setData(isSuccess);
        }
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> signup(@RequestBody AdminUserAddRequest adminUserAddRequest) {
        BaseResponse baseResponse = new BaseResponse();
        if (loginServiceImp.checkEmailExist(adminUserAddRequest.getEmail())) {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Email đã tồn tại");
            baseResponse.setData("");
        } else {
            boolean isSuccess = loginServiceImp.adminInsertUser(adminUserAddRequest);
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Successfully");
            baseResponse.setData(isSuccess);
        }
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/detail")
    public ResponseEntity<?> findUserDetailById(@RequestParam int userId) {
        List<AdminUserDetailResponse> list = seatServiceImp.findSeatById(userId);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(200);
        baseResponse.setMessage("");
        baseResponse.setData(list);

        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

}
