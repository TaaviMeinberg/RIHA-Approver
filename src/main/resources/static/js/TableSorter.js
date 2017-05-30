$(document).ready(function() {
	$('.hideAppr').on('click', function () {
  		var $rowsAppr = $('#info-systems-table tbody tr').filter(function () {
            return $.trim($(this).find('td').eq(6).text()) !== ""}).toggle();
  		
  		//for normal button
  		//$(this).text(function(i, v){
          // return v === 'Näita kooskõlastamist vajavaid' ? 'Näita Kõiki' : 'Näita kooskõlastamist vajavaid'})
    });

  	$('.hideEmptyAppr').on('click', function () {
  		var $rowsEmptyAppr = $('#info-systems-table tbody tr').filter(function () {
            return $.trim($(this).find('td').eq(6).text()) === ""}).toggle();
  	//for normal button
  		//$(this).text(function(i, v){
           //return v === 'Näita ainult kooskõlastatud' ? 'Näita Kõiki' : 'Näita ainult kooskõlastatud'})
    });
// old code for owner search bar with buttons
//  	$('.findOwner').on('click', function () {
//  		var $rowsOwner = $('#info-systems-table tbody tr').filter(function () {
//  			return $.trim($(this).find('td').eq(0).text() !== document.getElementById("owner").value}).toggle();
//  		//return $.trim($(this).find('td:not(:contains(("#ownerS").value))').eq(0).text())}).toggle();   //
//  		$(this).text(function(i, v){
//       		return v === 'Otsi omaniku' ? 'Näita Kõiki' : 'Otsi omaniku'})
//  	}));
  	

    $('.dataTable .filters input').keyup(function(e){

    	var $input = $(this);
        inputContent = $input.val().toLowerCase();
        idk = $input.parents('.table-responsive');
        column = idk.find('.filters th').index($input.parents('th'));
        $table = idk.find('.dataTable');
        $rows = $table.find('tbody tr');
        
        var $filteredRows = $rows.filter(function(){
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        
        $table.find('tbody .no-result').remove();
        
        $rows.show();
        $filteredRows.hide();
        
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">Tulemusi ei leitud.</td></tr>'));
        }
    });
    $('.dataTable .filters select').keyup(function(e){
    	
    	
        
        var $filteredRows = $rows.filter(function(){
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        
        $table.find('tbody .no-result').remove();
        
        $rows.show();
        $filteredRows.hide();
        
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">Tulemusi ei leitud.</td></tr>'));
        }
    });

});