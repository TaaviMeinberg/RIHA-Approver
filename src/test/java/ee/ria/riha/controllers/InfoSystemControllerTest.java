package ee.ria.riha.controllers;

import ee.ria.riha.models.Approval;
import ee.ria.riha.services.ApprovalStorageService;
import ee.ria.riha.services.DateTimeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class InfoSystemControllerTest {

  @Mock ApprovalStorageService storageService;
  @Mock DateTimeService dateTimeService;

  @Spy @InjectMocks
  InfoSystemController controller = new InfoSystemController();

  @Test
  public void updateApprovalStatus() {
    doNothing().when(storageService).saveInfosystemApproval(any(Approval.class));
    ZonedDateTime approvalTimestamp = ZonedDateTime.of(2016, 12, 12, 10, 10, 10, 0, ZoneId.of("Europe/Tallinn"));
    doReturn(approvalTimestamp).when(dateTimeService).now();

    String result = controller.updateApprovalStatus("/owner/infosystem", "MITTE KOOSKÕLASTATUD");

    assertEquals("{\"id\":\"/owner/infosystem\",\"timestamp\":\"2016-12-12T08:10:10\",\"status\":\"MITTE KOOSKÕLASTATUD\"}", result);
    ArgumentCaptor<Approval> aprovalCaptor = ArgumentCaptor.forClass(Approval.class);
    verify(storageService).saveInfosystemApproval(aprovalCaptor.capture());
    Approval approval = aprovalCaptor.getValue();
    assertEquals(approval.getId(), "/owner/infosystem");
    assertEquals(approval.getTimestamp(), "2016-12-12T08:10:10");
    assertEquals(approval.getStatus(), "MITTE KOOSKÕLASTATUD");
  }

  @Test
  public void approvals() {
    List<Approval> approvals = asList(new Approval("/owner/shortname1", "2016-01-01T10:00:00", "MITTE KOOSKÕLASTATUD"), new Approval("/owner/shortname2", "2015-10-10T01:10:10", "KOOSKÕLASTATUD"));
    doReturn(approvals).when(storageService).allApprovals();

    String result = controller.approvals();

    String expected = "[{\"id\":\"/owner/shortname1\",\"timestamp\":\"2016-01-01T10:00:00\",\"status\":\"MITTE KOOSKÕLASTATUD\"}," +
      "{\"id\":\"/owner/shortname2\",\"timestamp\":\"2015-10-10T01:10:10\",\"status\":\"KOOSKÕLASTATUD\"}]";
    assertEquals(expected, result);
  }
}