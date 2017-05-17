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
            return $.trim($('td:not(:contains(document.getElementById("ownerS").value))'))}).toggle();   //!== document.getElementById("owner").value}).toggle();
  		
  		$(this).text(function(i, v){
       		return v === 'Otsi omaniku' ? 'Näita Kõiki' : 'Otsi omaniku'})
  	});
  	
//  	$('.findOwner').on('keyup', function () {
//  	  var input, filter, table, tr, td, i;
//  	  input = document.getElementById("owner");
//  	  filter = input.value.toUpperCase();
//  	  table = document.getElementById("info-systems-table");
//  	  tr = table.getElementsByTagName("tr");
//  	  for (i = 0; i < tr.length; i++) {
//  	    td = tr[i].getElementsByTagName("td")[0];
//  	    if (td) {
//  	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//  	        tr[i].style.display = "";
//  	      } else {
//  	        tr[i].style.display = "none";
//  	      }
//  	    }       
//  	  }
//  	}
});