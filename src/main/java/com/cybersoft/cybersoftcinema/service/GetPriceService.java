package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.MovieTheaterShowingEntity;
import com.cybersoft.cybersoftcinema.payload.request.SeatInfoRequest;
import com.cybersoft.cybersoftcinema.payload.response.PriceResponse;
import com.cybersoft.cybersoftcinema.repository.MovieTheaterShowRepository;
import com.cybersoft.cybersoftcinema.repository.PriceRepository;
import com.cybersoft.cybersoftcinema.service.imp.GetPriceServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.sql.Time;
import java.time.LocalDate;

@Service
public class GetPriceService implements GetPriceServiceImp {

    @Autowired
    private MovieTheaterShowRepository movieTheaterShowRepository;

    @Autowired
    private PriceRepository priceRepository;

    @Override
    public PriceResponse getPriceByDateAndTime(SeatInfoRequest seatInfoRequest) {
        PriceResponse priceResponse = new PriceResponse();
        MovieTheaterShowingEntity data = movieTheaterShowRepository.findInfoById(seatInfoRequest.getIdMovie(), seatInfoRequest.getIdTheater(), seatInfoRequest.getIdShowing());

        priceResponse.setIdMovie(data.getMovieEntity().getId());
        priceResponse.setMovieName(data.getMovieEntity().getName());
        priceResponse.setMovieImg(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/movie/image/")
                .path(data.getMovieEntity().getImages())
                .toUriString());
        priceResponse.setAgeRating(data.getMovieEntity().getRequiredAge());
        priceResponse.setIdTheater(data.getTheaterEntity().getId());
        priceResponse.setTheaterName(data.getTheaterEntity().getName());
        priceResponse.setIdShowing(data.getShowingEntity().getId());
        priceResponse.setShowingDate(data.getShowingEntity().getShowingDate());
        priceResponse.setShowingTime(data.getShowingEntity().getStartTime());

        //Find the Day of week
        LocalDate checkWeekend = data.getShowingEntity().getShowingDate().toLocalDate();
        //Set the rush hour
        Time rushHourStart = Time.valueOf("18:30:00");
        Time rushHourEnd = Time.valueOf("20:30:00");

        //Check the showingDate is weekend
        if (checkWeekend.getDayOfWeek().equals("Saturday") || checkWeekend.getDayOfWeek().equals("Sunday")) {
            //Check the showingTime is rush hour
            if (data.getShowingEntity().getStartTime().after(rushHourStart) && data.getShowingEntity().getStartTime().before(rushHourEnd)) {
                //if true
                priceResponse.setIdPriceNomal(4);
                priceResponse.setPriceNomal(priceRepository.findById(4).get().getPrice());
                priceResponse.setIdPriceDouble(8);
                priceResponse.setPriceDouble(priceRepository.findById(8).get().getPrice());
            } else {
                priceResponse.setIdPriceNomal(3);
                priceResponse.setPriceNomal(priceRepository.findById(3).get().getPrice());
                priceResponse.setIdPriceDouble(7);
                priceResponse.setPriceDouble(priceRepository.findById(7).get().getPrice());
            }
        } else //ngày thường
        {
            if (data.getShowingEntity().getStartTime().after(rushHourStart) && data.getShowingEntity().getStartTime().before(rushHourEnd)) {
                priceResponse.setIdPriceNomal(2);
                priceResponse.setPriceNomal(priceRepository.findById(2).get().getPrice());
                priceResponse.setIdPriceDouble(6);
                priceResponse.setPriceDouble(priceRepository.findById(6).get().getPrice());
            } else {
                priceResponse.setIdPriceNomal(1);
                priceResponse.setPriceNomal(priceRepository.findById(1).get().getPrice());
                priceResponse.setIdPriceDouble(5);
                priceResponse.setPriceDouble(priceRepository.findById(5).get().getPrice());
            }
        }

        return priceResponse;
    }

    @Override
    public long countSeatSold(int movieId, int theaterId, int showingId, int seatTypeId) {
        long result = priceRepository.countSeatSold(movieId, theaterId, showingId, seatTypeId);
        return result;
    }
}
