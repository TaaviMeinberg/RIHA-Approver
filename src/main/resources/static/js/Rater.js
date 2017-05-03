"use strict";

function Rater(infosystemsUrl) {

  var ratingsUrl = '/ratings';

  var self = this;

  self.init = function() {
    loadInfosystems();
    $('body').on('click', '.approve button', self.approveInfosystem);
  };

  function loadInfosystems() {
    $.getJSON(infosystemsUrl, function(data) {
      self._createTableRows(data);
      loadRatings();
    });
  }

  function loadRatings () {
    $.getJSON(ratingsUrl, function (data) {
      self._addRatingsData(data);
      $('#info-systems-table').DataTable({
        language: { "url": "/js/vendor/jquery.dataTables.i18n.json" },
        paging: false,
        order: []
      });
    })
  }

  self._addRatingsData = function (data) {
    data.forEach(function (rating) {
      var row = $('tbody tr[data-id="' + rating.uri + '"]');
      $(row.find('.approved')).text(rating.timestamp);
      $(row.find('.rating-status')).text(rating.status);
    })
  };

  self.approveInfosystem = function (event) {
    var clickedButton = $(event.target);
    var infosystemRow = clickedButton.closest('tr');
    $.post('/approve/', {id: infosystemRow.data('id'), status: clickedButton.val()})
      .done(function (result) {
        infosystemRow.find('.approved').text(result.timestamp);
        infosystemRow.find('.rating-status').text(result.status);
      });
  };

  self._createTableRows = function(data) {
    var template = $('#row-template').html();

    var tbody = $('tbody');
    data.forEach(function (infosystem) {
      var newRow = $(template);
      newRow.attr('data-id', infosystem.uri);
      newRow.attr('title', JSON.stringify(infosystem));
      newRow.find('.owner').text(infosystem.owner.code);
      newRow.find('.name').text(infosystem.name);
      newRow.find('.objective').text(infosystem.objective);
      newRow.find('.last-modified').text(infosystem.meta && infosystem.meta.system_status ? infosystem.meta.system_status.timestamp : '');
      newRow.find('.status').text(infosystem.meta && infosystem.meta.system_status ?  infosystem.meta.system_status.status : '');
      newRow.find('.rating').text(infosystem.rating);
      tbody.append(newRow);
    });
  }
}
