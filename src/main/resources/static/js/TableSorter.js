$(document).ready(function() {
	$('.hideAppr').on('click', function () {
  		var $rowsAppr = $('#info-systems-table tbody tr').filter(function () {
            return $.trim($(this).find('td').eq(6).text()) !== ""}).toggle();
  		
  		//for normal buttons
  		//$(this).text(function(i, v){
          // return v === 'Näita kooskõlastamist vajavaid' ? 'Näita Kõiki' : 'Näita kooskõlastamist vajavaid'})
    });

  	$('.hideEmptyAppr').on('click', function () {
  		var $rowsEmptyAppr = $('#info-systems-table tbody tr').filter(function () {
            return $.trim($(this).find('td').eq(6).text()) === ""}).toggle();
  		
  		//$(this).text(function(i, v){
           //return v === 'Näita ainult kooskõlastatud' ? 'Näita Kõiki' : 'Näita ainult kooskõlastatud'})
    });

  	$('.findOwner').on('click', function () {
  		var $rowsOwner = $('#info-systems-table tbody tr').filter(function () {
  			return $.trim($(this).find('td').eq(0).text() !== document.getElementById("owner").value}).toggle();
  		//return $.trim($(this).find('td:not(:contains(("#ownerS").value))').eq(0).text())}).toggle();   //
  		$(this).text(function(i, v){
       		return v === 'Otsi omaniku' ? 'Näita Kõiki' : 'Otsi omaniku'})
  	}));
  	

//    $('.filterable .btn-filter').click(function(){
//        var $panel = $(this).parents('.filterable'),
//        $filters = $panel.find('.filters input'),
//        $tbody = $panel.find('.table tbody');
//        if ($filters.prop('disabled') == true) {
//            $filters.prop('disabled', false);
//            $filters.first().focus();
//        } else {
//            $filters.val('').prop('disabled', true);
//            $tbody.find('.no-result').remove();
//            $tbody.find('tr').show();
//        }
//    });

    $('.filterable .filters input').keyup(function(e){
        
        var code = e.keyCode || e.which;
        if (code == '9') return;
        
        var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.dataTable'),
        $rows = $table.find('tbody tr');
        
        var $filteredRows = $rows.filter(function(){
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        
        $table.find('tbody .no-result').remove();
        
        $rows.show();
        $filteredRows.hide();
        
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
        }
    });
});