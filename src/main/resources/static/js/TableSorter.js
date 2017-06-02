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
        tableDiv = $input.parents('.table-responsive');
        column = tableDiv.find('.filters th').index($input.parents('th'));
        $table = tableDiv.find('.dataTable');
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
    
    
    $('.dataTable .filters select').on('change',function(e){
    	var $input = $(this);
        inputContent = $input.val().toLowerCase();
        tableDiv = $input.parents('.table-responsive');
        column = tableDiv.find('.filters th').index($input.parents('th'));
        $table = tableDiv.find('.dataTable');
        $rows = $table.find('tbody tr');
        
        var dt = new Date();
        
   		var rex = new RegExp($('#filterText').val());
   		var value = $(this).find('td').eq(column);
   		var valStr = value.toString();
   		var valDt = valStr.substring(0, 10);
   		var valTm = valStr.substring(11, 16);
   		var dtSplit = valDt.split("-");
   		
   		//2017-06-02T09:36:03.42
   		
   		var valYr = dtSplit(0);
   		var valMn = dtSplit(1);
   		var valDy = dtSplit(2);
   		
   		var valDate = new Date(valMn, valDy, valYr, valTm);

   		if(rex =="/all/"){
    		$rows.show()
    		}
    	else if(rex =="/7days/"){
    			
    		if (dt - valDate >= 604800000) {
				$rows.show();
			}else {
				$rows.hide();
			}
    		
    		
    		return value.indexOf(inputContent) === -1;
    	}
    	else if(rex =="/1hour/"){
			
    		if (dt - valDate >= 3600000) {
				$rows.show();
			}else {
				$rows.hide();
			}
    		
    		
    		return value.indexOf(inputContent) === -1;
    	}
   		
       
    });

});