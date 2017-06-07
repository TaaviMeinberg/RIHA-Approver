$(document).ready(function() {
	//hides approved items in table
	$('.hideAppr').on('click', function () {
  		var $rowsAppr = $('#info-systems-table tbody tr').filter(function () {
            return $.trim($(this).find('td').eq(6).text()) !== ""}).toggle();
  	
    });
	
	//hides not approved items in table 
  	$('.hideEmptyAppr').on('click', function () {
  		
  		var $rowsEmptyAppr = $('#info-systems-table tbody tr').filter(function () {
            return $.trim($(this).find('td').eq(6).text()) === ""}).toggle();
  	});
  	
  	//search bar function for individual columns
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
});