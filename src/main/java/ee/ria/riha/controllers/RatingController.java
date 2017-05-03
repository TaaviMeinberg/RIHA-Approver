package ee.ria.riha.controllers;

import ee.ria.riha.models.Rating;
import ee.ria.riha.models.Status;
import ee.ria.riha.services.RatingStorageService;
import ee.ria.riha.services.DateTimeService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import static ee.ria.riha.services.DateTimeService.format;
import static ee.ria.riha.services.DateTimeService.toUTC;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class RatingController {

  @Autowired RatingStorageService ratingStorageService;
  @Autowired DateTimeService dateTimeService;

  @Value("${infosystems.url}")
  private String infosystemsUrl;

  @RequestMapping(value = "/", method = GET)
  public String index(Model model) {
    model.addAttribute("negative", Status.NEGATIVE.getValue());
    model.addAttribute("neutral", Status.NEUTRAL.getValue());
    model.addAttribute("infosystemsUrl", infosystemsUrl);
    return "index";
  }

  @RequestMapping(value = "/ratings", method = GET, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String ratings() {
    return new JSONArray(ratingStorageService.allRatings()).toString();
  }

  @RequestMapping(value = "/ratings/rated/", method = GET, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String ratedRatings() {
    return new JSONArray(ratingStorageService.approvedRatings()).toString();
  }

  @RequestMapping(value = "/rate/", method = POST, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String updateRatingStatus(@RequestParam String id, String status){
    Rating rating = new Rating(id, format(toUTC(dateTimeService.now())), status);
    ratingStorageService.saveInfosystemRating(rating);
    return new JSONObject(rating).toString();
  }
}