package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.*;
import com.cybersoft.cybersoftcinema.payload.request.SeatInfoRequest;
import com.cybersoft.cybersoftcinema.payload.request.TicketRequest;
import com.cybersoft.cybersoftcinema.payload.response.SeatUnavailableResponse;
import com.cybersoft.cybersoftcinema.repository.SeatRepository;
import com.cybersoft.cybersoftcinema.service.imp.SeatServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeatService implements SeatServiceImp {

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public List<SeatUnavailableResponse> findUnavalableSeat(SeatInfoRequest seatInfoRequest) {
        List<SeatUnavailableResponse> list = new ArrayList<>();
        List<SeatEntity> seatEntity = seatRepository.findUnavalableSeat(seatInfoRequest.getIdMovie(), seatInfoRequest.getIdTheater(), seatInfoRequest.getIdShowing());

        for (SeatEntity data : seatEntity) {
            SeatUnavailableResponse seatUnavailableResponse = new SeatUnavailableResponse();
            seatUnavailableResponse.setSeatNumber(data.getSeatNumber());
            list.add(seatUnavailableResponse);
        }
        return list;
    }

    @Override
    public boolean buyTicket(List<TicketRequest> ticketRequest) {
        List<SeatEntity> list = new ArrayList<>();
        boolean isSuccess = false;

        for (TicketRequest data:ticketRequest) {
            SeatEntity seatEntity = new SeatEntity();
            seatEntity.setSeatNumber(data.getSeatNumber());

            SeatTypeEntity seatTypeEntity = new SeatTypeEntity();
            seatTypeEntity.setId(data.getIdSeatType());
            seatEntity.setSeatTypeEntity(seatTypeEntity);

            PriceEntity priceEntity = new PriceEntity();
            priceEntity.setId(data.getIdPrice());
            seatEntity.setPriceEntity(priceEntity);

            UsersEntity usersEntity = new UsersEntity();

            usersEntity.setId(data.getIdUser());
            seatEntity.setUsersEntity(usersEntity);

            MovieEntity movieEntity = new MovieEntity();
            movieEntity.setId(data.getIdMovie());
            seatEntity.setMovieEntity(movieEntity);

            TheaterEntity theaterEntity = new TheaterEntity();
            theaterEntity.setId(data.getIdTheater());
            seatEntity.setTheaterEntity(theaterEntity);

            ShowingEntity showingEntity = new ShowingEntity();
            showingEntity.setId(data.getIdShowing());
            seatEntity.setShowingEntity(showingEntity);

            list.add(seatEntity);
        }
        try {
            seatRepository.saveAll(list);
            isSuccess = true;
        } catch (Exception e) {
            System.out.println("Thêm thất bại");
        }
        return isSuccess;
    }
}
