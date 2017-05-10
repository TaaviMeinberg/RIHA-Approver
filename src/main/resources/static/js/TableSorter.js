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
  		
	//for normal buttons:
	//$(this).text(function(i, v){
    //return v === 'Näita ainult kooskõlastatud' ? 'Näita Kõiki' : 'Näita ainult kooskõlastatud'})
});
$('.findOwner').on('click', function () {
	var $rowsOwner = $('#info-systems-table tbody tr').filter(function () {
       return $.trim($(this).find('td').eq(0).text()) !== document.getElementById("owner").value}).toggle();
  		
	$(this).text(function(i, v){
   		return v === 'Otsi omaniku' ? 'Näita Kõiki' : 'Otsi omaniku'})
});
