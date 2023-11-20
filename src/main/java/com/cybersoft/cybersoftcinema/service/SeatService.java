package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.*;
import com.cybersoft.cybersoftcinema.payload.request.SeatInfoRequest;
import com.cybersoft.cybersoftcinema.payload.request.TicketRequest;
import com.cybersoft.cybersoftcinema.payload.response.AdminUserDetailResponse;
import com.cybersoft.cybersoftcinema.payload.response.SeatUnavailableResponse;
import com.cybersoft.cybersoftcinema.payload.response.TicketInfoResponse;
import com.cybersoft.cybersoftcinema.repository.SeatRepository;
import com.cybersoft.cybersoftcinema.service.imp.SeatServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.sql.Date;
import java.sql.Time;
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

        for (TicketRequest data : ticketRequest) {
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

    @Override
    public List<TicketInfoResponse> findTicketByUserId(int userId) {
        List<TicketInfoResponse> ticketInfoResponseList = new ArrayList<>();
        List<SeatEntity> list = seatRepository.findTicketByIdUser(userId);

        String movieName = "";
        String theaterName = "";
        Date showingDate = null;
        Time showingTime = null;
        String movieImg = "";

        List<Integer> seatNumberList = new ArrayList<>();

        for (SeatEntity data : list) {
            if (movieName.equals(data.getMovieEntity().getName()) &&
                    theaterName.equals(data.getTheaterEntity().getName()) &&
                    showingDate != null && showingDate.equals(data.getShowingEntity().getShowingDate()) &&
                    showingTime != null && showingTime.equals(data.getShowingEntity().getStartTime())) {

                seatNumberList.add(data.getSeatNumber());
            } else {
                if (!seatNumberList.isEmpty()) {
                    TicketInfoResponse ticketInfoResponse = new TicketInfoResponse();
                    ticketInfoResponse.setMovieName(movieName);
                    ticketInfoResponse.setMovieImg(ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/movie/image/")
                            .path(data.getMovieEntity().getImages())
                            .toUriString());
                    ticketInfoResponse.setTheaterName(theaterName);
                    ticketInfoResponse.setShowingDate(showingDate);
                    ticketInfoResponse.setShowingTime(showingTime);
                    ticketInfoResponse.setSeatNumber(seatNumberList);
                    ticketInfoResponseList.add(ticketInfoResponse);
                }

                movieName = data.getMovieEntity().getName();
                theaterName = data.getTheaterEntity().getName();
                showingDate = data.getShowingEntity().getShowingDate();
                showingTime = data.getShowingEntity().getStartTime();
                movieImg = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/movie/image/")
                        .path(data.getMovieEntity().getImages())
                        .toUriString();

                seatNumberList = new ArrayList<>();
                seatNumberList.add(data.getSeatNumber());
            }
        }

        if (!seatNumberList.isEmpty()) {
            TicketInfoResponse ticketInfoResponse = new TicketInfoResponse();
            ticketInfoResponse.setMovieName(movieName);
            ticketInfoResponse.setMovieImg(movieImg);
            ticketInfoResponse.setTheaterName(theaterName);
            ticketInfoResponse.setShowingDate(showingDate);
            ticketInfoResponse.setShowingTime(showingTime);
            ticketInfoResponse.setSeatNumber(seatNumberList);
            ticketInfoResponseList.add(ticketInfoResponse);
        }

        return ticketInfoResponseList;
    }

    @Override
    public List<AdminUserDetailResponse> findSeatById(int userId) {
        List<SeatEntity> seatEntityList = seatRepository.findTicketByIdUser(userId);
        List<AdminUserDetailResponse> list = new ArrayList<>();
        for (SeatEntity data:seatEntityList) {
            AdminUserDetailResponse adminUserDetailResponse = new AdminUserDetailResponse();
            adminUserDetailResponse.setMovieName(data.getMovieEntity().getName());
            adminUserDetailResponse.setTheaterName(data.getTheaterEntity().getName());
            adminUserDetailResponse.setShowingDate(data.getShowingEntity().getShowingDate());
            adminUserDetailResponse.setShowingTime(data.getShowingEntity().getStartTime());
            adminUserDetailResponse.setSeatNumber(data.getSeatNumber());
            adminUserDetailResponse.setPrice(data.getPriceEntity().getPrice());
            list.add(adminUserDetailResponse);
        }
        return list;
    }

    @Override
    public List<SeatUnavailableResponse> findUnavalableSeat(int movieId,int theaterId,int showingId) {
        List<SeatUnavailableResponse> list = new ArrayList<>();
        List<SeatEntity> seatEntity = seatRepository.findUnavalableSeat(movieId,theaterId,showingId);

        for (SeatEntity data : seatEntity) {
            SeatUnavailableResponse seatUnavailableResponse = new SeatUnavailableResponse();
            seatUnavailableResponse.setSeatNumber(data.getSeatNumber());
            list.add(seatUnavailableResponse);
        }
        return list;
    }
}
