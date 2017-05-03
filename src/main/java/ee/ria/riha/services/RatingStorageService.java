package ee.ria.riha.services;

import ee.ria.riha.models.Rating;
import ee.ria.riha.models.Status;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

@Service
public class RatingStorageService {

  @Autowired DateTimeService dateTimeService;

  private Logger logger = LoggerFactory.getLogger(RatingStorageService.class);

  File file = new File("ratings.db");

  synchronized public void saveInfosystemRating(Rating rating) {
    Properties properties = loadProperties();
    properties.setProperty(rating.getUri(), rating.getTimestamp() + "|" + rating.getStatus());
    save(properties);
  }

  public List<Rating> allRatings() {
    //todo review to use get..., setProperty
    return loadProperties().entrySet().stream().map(property -> {
      String[] value = ((String)property.getValue()).split("\\|");
      return new Rating((String)property.getKey(), value[0], value[1]);
    }).collect(Collectors.toList());
  }

  public List<Rating> approvedRatings() {
    return allRatings().stream().filter(a -> a.getStatus().equals(Status.APPROVED.getValue())).collect(Collectors.toList());
  }

  private void save(Properties properties) {
    try (OutputStream outputStream = new FileOutputStream(file)) {
      properties.store(outputStream, null);
    }
    catch (IOException e) {
      logger.error("Could not save ratings", e);
      throw new RuntimeException(e);
    }
  }

  Properties loadProperties() {
    if (!file.exists()) return new Properties();
      try (InputStream inputStream = new FileInputStream(file)) {
      Properties properties = new Properties();
      properties.load(inputStream);
      return properties;
    }
    catch (IOException e) {
      logger.error("Could not load ratings", e);
      throw new RuntimeException(e);
    }
  }
}
