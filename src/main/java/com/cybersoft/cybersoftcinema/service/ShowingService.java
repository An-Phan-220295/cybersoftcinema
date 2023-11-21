package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.ShowingEntity;
import com.cybersoft.cybersoftcinema.payload.request.ShowingRequest;
import com.cybersoft.cybersoftcinema.payload.response.ShowingResponse;
import com.cybersoft.cybersoftcinema.repository.ShowingRepository;
import com.cybersoft.cybersoftcinema.service.imp.ShowingServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShowingService implements ShowingServiceImp {

    @Autowired
    private ShowingRepository showingRepository;

    @Override
    public List<ShowingResponse> findAllShowing() {
        List<ShowingEntity> showingEntityList = showingRepository.findAll();
        List<ShowingResponse> list = new ArrayList<>();
        for (ShowingEntity data : showingEntityList) {
            ShowingResponse showingResponse = new ShowingResponse();
            showingResponse.setId(data.getId());
            showingResponse.setShowingDate(data.getShowingDate());
            showingResponse.setStartTime(data.getStartTime());
            list.add(showingResponse);
        }
        return list;
    }

    @Override
    public boolean insertShowing(ShowingRequest showingRequest) {
        ShowingEntity showingEntity = new ShowingEntity();
        showingEntity.setStartTime(showingRequest.getStartTime());
        showingEntity.setShowingDate(showingRequest.getShowingDate());
        boolean isSuccess = false;
        try {
            showingRepository.save(showingEntity);
            isSuccess = true;
        } catch (Exception e) {
            System.out.println("Thêm thất bại");
        }
        return isSuccess;
    }

    @Override
    public boolean checkExisting(ShowingRequest showingRequest) {
        boolean isExisting = false;
        ShowingEntity showingEntity = new ShowingEntity();
        showingEntity.setStartTime(showingRequest.getStartTime());
        showingEntity.setShowingDate(showingRequest.getShowingDate());
        try {
            isExisting = showingRepository.existsByShowingDateAndStartTime(showingRequest.getShowingDate(), showingRequest.getStartTime());
        } catch (Exception e) {
            System.out.println("Thêm thất bại");
        }
        return isExisting;
    }

    @Override
    public boolean deleteShowing(int showingId) {
        boolean isSuccess = false;
        try {
            showingRepository.deleteById(showingId);
            isSuccess = true;
        } catch (Exception e) {
            System.out.println("Xóa thất bại");
        }
        return false;
    }
}
