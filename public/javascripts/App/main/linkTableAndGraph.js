
var firstTimeFilterIsolates = true;
var firstTimeFilterProfiles = true;

function linkTableAndGraph(property, key){

	var divToCheck = 'div' + property;
	var tableToCheck = 'table' + property;

	var headers = [];


    if (firstTimeFilterIsolates && property == 'isolates'){
    	var tHeadersI = [];
    	$('#'+tableToCheck+' thead th').each(function(i, header){
    		tHeadersI.push(header.innerHTML);
    	});
    	keyIndexI = tHeadersI.indexOf(key);
    }
    if (firstTimeFilterProfiles && property == 'profiles'){
    	var tHeadersP = [];
    	$('#'+tableToCheck+' thead th').each(function(i, header){
    		tHeadersP.push(header.innerHTML);
    	});
    	keyIndexP = tHeadersP.indexOf(key);
    }

	$('#'+tableToCheck+' thead th').click(function(d){

	  if (firstTimeFilterIsolates){
	  	metadataFilter = new Array(3);
	  	metadataFilter[0] = keyIndexI;
	  	firstTimeFilterIsolates = false;
	  }
	  if (firstTimeFilterProfiles){
	  	schemeFilter = new Array(3);
	  	schemeFilter[0] = keyIndexP;
	  	firstTimeFilterProfiles = false;
	  }

      var columnIndex = $(this).index();
      //if (property == 'profiles') columnIndex += 1;
      var table = $('#'+ tableToCheck).DataTable();

      if (table.rows('.selected').data().length != 0){
      	var columnDataInter = table.rows('.selected').data();
      	var columnData = [];
      	var keyData = [];
      	for(i=0;i<columnDataInter.length;i++){
      		columnData.push(columnDataInter[i][columnIndex]);
      		if (property == 'isolates') keyData.push(columnDataInter[i][metadataFilter[0]]);
      		else if (property == 'profiles') keyData.push(columnDataInter[i][schemeFilter[0]]);
      	}
      	if (property == 'isolates'){
      		metadataFilter[1] = keyData;
      		metadataFilter[2] = columnData;
      	}
      	else if (property == 'profiles'){
      		schemeFilter[1] = keyData;
      		schemeFilter[2] = columnData;
      	}
      }
  	  else{
  	  	var columnData = table.column(columnIndex).data();
  	  	if (property == 'isolates'){
  	  		metadataFilter[1] = [];
      		metadataFilter[2] = [];
  	  	}
  	  	else if (property == 'profiles'){
  	  		schemeFilter[1] = [];
  	  		schemeFilter[2] = [];
  	  	} 
  	  }

  	  columnName = table.column(columnIndex).header().innerHTML;
      
      createLinkButton(property, columnIndex, columnData, columnName);
      
      constructPie(columnData, columnIndex, columnName, 'pie' + property, 75, 0, 150);

  	});

}


function createLinkButton(property, columnIndex, columnData, columnName){
	
	$("#divbuttonlinkpie" + property).empty();
	
	var button = $('<button id = "buttonlinkpie'+ property + '" type="button" class="btn btn-lg btn-primary">Link to Tree</button>');
	$("#divbuttonlinkpie" + property).append(button);

	$("#buttonlinkpie" + property).click(function(d){

		changeFromTable = true;

		$('#divButtonLegend').css('display', 'block');
		$('#col_info').css('display', 'block');

		constructPie(columnData, columnIndex, columnName, 'currentpiePlace', 40, 0, 40); //tree tab pie

		$('.nav-tabs > li.active').removeClass('active');
      	$('.tab-pane.active').removeClass('active');
      	$('#treeTab').addClass('active');
      	$('#treeContent').addClass('active');
		
		if (property =='isolates'){
	      	$("#selectByMetadata").val(String(columnIndex+2));
	      	$("#selectByMetadata").trigger("change");
	    }
        else{
	      	if(columnIndex != 0){
	      		$("#selectByScheme").val(String(columnIndex+1));
	      		$("#selectByScheme").trigger("change");
	      	}
      	}
	});
}

function destroyLink(property){
	$("#divbuttonlinkpie" + property).empty();
}

function linkGraphAndTable(property, indexProperty, columnName, key){
	
	var tableToCheck = 'table' + property;
	
	changeFromTable = true;

	if (firstTimeFilterIsolates && property == 'isolates'){
    	var tHeadersI = [];
    	$('#'+tableToCheck+' thead th').each(function(i, header){
    		tHeadersI.push(header.innerHTML);
    	});
    	keyIndexI = tHeadersI.indexOf(key);
    }
    if (firstTimeFilterProfiles && property == 'profiles'){
    	var tHeadersP = [];
    	$('#'+tableToCheck+' thead th').each(function(i, header){
    		tHeadersP.push(header.innerHTML);
    	});
    	keyIndexP = tHeadersP.indexOf(key);
    }

	if (indexProperty == -1){

		destroyPie('pie' + property);
		destroyPie('currentpiePlace');
		destroyLink(property);

		if (property =='isolates') $("#selectByMetadata").trigger("change"); 
	    else $("#selectByScheme").trigger("change");
	}
	else{
	
		var table = $('#'+ tableToCheck).DataTable();
	  	//var columnData = table.column(indexProperty).data();
	  	if (firstTimeFilterIsolates){
		  	metadataFilter = new Array(3);
		  	metadataFilter[0] = keyIndexI;
		  	firstTimeFilterIsolates = false;
		  }
		  if (firstTimeFilterProfiles){
		  	schemeFilter = new Array(3);
		  	schemeFilter[0] = keyIndexP;
		  	firstTimeFilterProfiles = false;
		  }

	  	if (table.rows('.selected').data().length != 0){
	      	var columnDataInter = table.rows('.selected').data();
	      	var columnData = [];
	      	var keyData = [];
	      	for(i=0;i<columnDataInter.length;i++){
	      		columnData.push(columnDataInter[i][indexProperty]);
	      		if (property == 'isolates') keyData.push(columnDataInter[i][metadataFilter[0]]);
      			else if (property == 'profiles') keyData.push(columnDataInter[i][schemeFilter[0]]);
	      	}
	      	if (property == 'isolates'){
      		metadataFilter[1] = keyData;
      		metadataFilter[2] = columnData;
	      	}
	      	else if (property == 'profiles'){
	      		schemeFilter[1] = keyData;
	      		schemeFilter[2] = columnData;
	      	}
	    }
  	    else{
	  	  	var columnData = table.column(indexProperty).data();
	  	  	if (property == 'isolates'){
  	  		metadataFilter[1] = [];
      		metadataFilter[2] = [];
	  	  	}
	  	  	else if (property == 'profiles'){
	  	  		schemeFilter[1] = [];
	  	  		schemeFilter[2] = [];
	  	  	}
	  	  }
	  	
	  	constructPie(columnData, indexProperty, columnName, 'pie' + property, 75, 0, 150); //table tab pie

	  	constructPie(columnData, indexProperty, columnName, 'currentpiePlace', 75, 0, 75); //tree tab pie

	  	createLinkButton(property, indexProperty);

	  	if (property =='isolates') $("#selectByMetadata").trigger("change"); 
	    else $("#selectByScheme").trigger("change");
	}
      	
}
