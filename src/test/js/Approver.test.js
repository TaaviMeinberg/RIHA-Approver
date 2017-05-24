describe('Approver', function() {

  var data = [
    {
      "name": "Eesti kirikute, koguduste ja koguduste liitude register",
      "shortname": "Eesti kirikuregister",
      "objective": "kirkute register test ei tea mida siia kirjutada sest see on test",
      "owner": {
        "code": "70000562",
        "name": "Siseministeerium"
      },
      "documentation": "eesti_kirikute_koguduste_ja_koguduste_liitude_register",
      "meta": {
        "system_status": {
          "status": "INFOSYS_STAATUS_LOPETATUD",
          "timestamp": "2015-09-05T00:36:26.255215"
        },
        "approval_status": {
          "status": "INFOSYS_STAATUS_LOPETATUD",
          "timestamp": "2015-09-05T00:36:26.255215"
        }
      },
      "uri": "http://base.url:8090/Eesti%20kirikuregister"
    },
    {
      "name": "Õpilaste ja üliõpilaste register",
      "shortname": "Õppurite register",
      "objective": "õppurite loendamine ja ma ei tea mida siia kirjutada, aga vahet pole sest see on test",
      "owner": {
        "code": "70000740",
        "name": "Haridus- ja Teadusministeerium"
      },
      "documentation": "opilaste_ja_uliopilaste_register",
      "meta": {
        "system_status": {
          "status": "INFOSYS_STAATUS_LOPETATUD",
          "timestamp": "2013-11-14T13:43:55.546948"
        },
        "approval_status": {
          "status": "INFOSYS_STAATUS_LOPETATUD",
          "timestamp": "2013-11-14T13:43:55.546948"
        }
      },
      "uri": "http://base.url:8090/%C3%95ppurite%20register"
    }
  ];

  it('fills table with info system data', function() {
    loadFixtures('table.html');
    var approver = new Approver();

    approver._createTableRows(data);

    var rows = $('tbody tr');

    expect(rows.length).toBe(2);
    expect($(rows[0]).find('.name').text()).toBe('Eesti kirikute, koguduste ja koguduste liitude register');
    expect($(rows[0]).find('.objective').text()).toBe('kirkute register test ei tea mida siia kirjutada sest see on test');
    expect($(rows[0]).find('.owner').text()).toBe('70000562');
    expect($(rows[0]).data('id')).toBe('http://base.url:8090/Eesti%20kirikuregister');
    expect($(rows[0]).find('.last-modified').text()).toBe('2015-09-05T00:36:26.255215');
    expect($(rows[0]).find('.status').text()).toBe('INFOSYS_STAATUS_LOPETATUD');
  });

  describe('adds approval', function() {
    function parametrizeTemplateRow() {
      $('tbody').append($('#row-template').html());
      $('tbody tr').attr('data-id', 'http://base.url/shortname');
      $('tbody td.last-modified').text('2016-01-01T10:00:00');
    }

    it('to approved infosystem', function() {
      loadFixtures('table.html');
      parametrizeTemplateRow();

      new Approver()._addApprovalsData([{"comment":"Infosüsteem on edukalt kooskõlastatud.", "token":"nimi:{ eesnimi:Taavi, perekonnanimi:Meinberg } }, asutus:{ registrikood:239857235, nimetus:RIHA }", "uri":"http://base.url/shortname", "timestamp":"2015-01-01T10:00:00", "status": "KOOSKÕLASTATUD"}]);
      
      expect($('tbody .approval-comment').text()).toBe('Infosüsteem on edukalt kooskõlastatud.');
      expect($('tbody .approved').text()).toBe('2015-01-01T10:00:00');
      expect($('tbody .approval-status').text()).toBe('KOOSKÕLASTATUD');
    });

    it('to infosystem approved before latest modification', function() {
      loadFixtures('table.html');
      parametrizeTemplateRow();

      new Approver()._addApprovalsData([{"comment":"Infosüsteem on edukalt kooskõlastatud.", "token":"nimi:{ eesnimi:Taavi, perekonnanimi:Meinberg } }, asutus:{ registrikood:239857235, nimetus:RIHA }", "uri":"http://base.url/shortname", "timestamp":"2016-01-01T10:00:00", "status": "KOOSKÕLASTATUD"}]);
      
      expect($('tbody .approval-comment').text()).toBe('Infosüsteem on edukalt kooskõlastatud.');
      expect($('tbody .approved').text()).toBe('2016-01-01T10:00:00');
      expect($('tbody .approval-status').text()).toBe('KOOSKÕLASTATUD');
    });
  });
  //Needs to be rewritten to account for latest approval method
  describe('Approve button', function() {
    it('changes info system status to Approved and sets approval timestamp', function() {
      setFixtures(
        '<tr data-id="1000-RIA">' +
          '<td class="approved"></td>' +
          '<td class="approval-status"></td>' +
          '<td class="approve">' +
            '<button id="btnApproval" class="btn btn-sm btn-outline-primary" data-status="KOOSKÕLASTATUD">hinda</button>' +
          '</td>' +
        '</tr>');
      spyOn($, 'post').and.returnValue(promise({id: 'http://base.url/shortname', timestamp: '2016-12-05T15:29:00.128468', status: 'KOOSKÕLASTATUD', comment: "kommentaar"}));
      var event  = {target: $('button[data-status="KOOSKÕLASTATUD"]')};
      var modal = document.getElementById('modal');
      var infosystemRow = "1000-RIA";
      
      addApproval(infosystemRow, modal);

      expect($('.approved').text()).toBe('2016-12-05T15:29:00.128468');
      expect($('.approval-status').text()).toBe('KOOSKÕLASTATUD');
    });
  });
});

