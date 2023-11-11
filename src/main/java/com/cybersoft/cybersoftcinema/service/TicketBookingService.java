package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.ShowingEntity;
import com.cybersoft.cybersoftcinema.payload.response.QuickBuyMovieResponse;
import com.cybersoft.cybersoftcinema.payload.response.ShowResponse;
import com.cybersoft.cybersoftcinema.repository.MovieTheaterShowRepository;
import com.cybersoft.cybersoftcinema.service.imp.TicketBookingServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Service
public class TicketBookingService implements TicketBookingServiceImp {
    @Autowired
    private MovieTheaterShowRepository movieTheaterShowRepository;

    @Autowired
    private QuickBuyService quickBuyService;

    @Override
    public List<ShowResponse> getShowingTimeAndTheaerByMovieAndDate(int id, Date showingDate) {
        List<ShowResponse> list = new ArrayList<>();
        List<QuickBuyMovieResponse> theaterList = quickBuyService.getTheaterByMovie(id);
        for (QuickBuyMovieResponse data : theaterList) {
//            List<Time> showTime = new ArrayList<>();
            ShowResponse response = new ShowResponse();
            response.setTheaterId((data.getTheaterId()));
            response.setTheaterName(data.getTheaterName());
            List<ShowingEntity> showingEntityList = new ArrayList<>();
            List<ShowingEntity> showingEntities = new ArrayList<>();
            showingEntities = movieTheaterShowRepository.findShowingTimeByMovieAndTheaterAndDate(id, data.getTheaterId(), showingDate);
            if (!showingEntities.isEmpty()) {
                for (ShowingEntity data1: showingEntities) {
                    ShowingEntity showingEntity = new ShowingEntity();
                    showingEntity.setId(data1.getId());
                    showingEntity.setStartTime(data1.getStartTime());
                    showingEntityList.add(showingEntity);
                }
                response.setShowings(showingEntityList);
                list.add(response);
//                for (ShowingEntity data1: showingEntityList) {
//                    showTime.add(data1.getStartTime());
//                }
//                response.setShowings(showTime);
//                list.add(response);
            }
        }
        return list;
    }
}
