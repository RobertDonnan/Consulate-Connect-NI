//initialise map variable and variables for routes. Declared before intiMap so can be used globally. 
let map;
let BangortoYMCA;
let migrantcentretocollege;
let polandtouu;
let qubtous;
let consulates;
let uutohorns;

function initMap(){
	//declaring variables
	let osm;//openstreetmaplayer
	let myview;//map view
	//categories for each section 
	let charities;
	let NGOs;
	let education;
	const key = '2qIDnhMFyH3S0GYvNAZs';//Key for MapTiler API 


	
	
	//Creating a view centered in UK
	//Set to US Consulate by default
	myview = new ol.View(
	{
	constrainResolution: true,
	center: ol.proj.fromLonLat([-5.9437518914600105, 54.57152676225067] ,'EPSG:3857'),
	zoom:7,
	}
	);
	

	//OpenStreetMap Tile
	osm = new ol.layer.Tile(
	{
		preload: Infinity,
		source: new ol.source.OSM(),
		title: 'Open Street Map',
		type: 'base'
	}
	);
	
	
	
	//Charities WMS Layer - To display charities for migrants across NI
	charities = new ol.layer.Tile(
	{
		source: new ol.source.TileWMS(
		{
			url: 'http://localhost:8080/geoserver/consulate_test/wms',
        params: {'LAYERS': 'consulate_test:charities'},
		}
	),
		opacity: 10,
		title: 'Charities for Migrants',
		visible: false
	}
	);
	//NGO's WMS Layer - To display Non-Government organisations for migrants
	
	NGOs = new ol.layer.Tile(
	{
		source: new ol.source.TileWMS(
		{
			url: 'http://localhost:8080/geoserver/consulate_test/wms',
        params: {'LAYERS': 'consulate_test:NGOs'},
		}
	),
		opacity: 10,
		title: 'Non-Government organisations',
		visible: false
	}
	);
	//Education WMS Layer - To display all higher level colleges and universities across NI
		education = new ol.layer.Tile(
	{
		source: new ol.source.TileWMS(
		{
			url: 'http://localhost:8080/geoserver/consulate_test/wms',
        params: {'LAYERS': 'consulate_test:Education'},
		}
	),
		opacity: 10,
		title: 'Educational Institutions',
		visible: false
	}


	);
	
		//Consulates WMS Layer - To display all higher level colleges and universities across NI
		consulates = new ol.layer.Tile(
	{
		source: new ol.source.TileWMS(
		{
			url: 'http://localhost:8080/geoserver/consulate_test/wms',
        params: {'LAYERS': 'consulate_test:consulates2'},
		}
	),
		opacity: 10,
		title: 'Foreign Consulates',
		visible: false
	}
	);
	
	

	
	

		//JS for map functionality
	map = new ol.Map(
	{
	target: 'map',
	layers:[osm, NGOs, charities, education, consulates],//layers for each category + openstreetmap layer 
	view: myview,
	controls:[
	new ol.control.Attribution(),
	new ol.control.Zoom(),
	new ol.control.ScaleLine(),
	new ol.control.LayerSwitcher(),
	new ol.control.FullScreen()//Control to allow users to look at map full screen 
	]
	});


		 //Geocoder Control using a function from maptiler 
	const geocoder = new openlayersMaptilerGeocoder.GeocodingControl(
	{
		apiKey: key//Uses key provided when declaring variables
	});
	map.addControl(geocoder);//adds function to map
}


		







 function routes(selectedRoute){
	 document.getElementById("routesDropdown").classList.toggle("show");
	 //Removes all current layers if a new one is selected - essentially clearing other routes from the map when a new one is selected.
            map.removeLayer(uutohorns);
			map.removeLayer(polandtouu);
			map.removeLayer(qubtous);
			map.removeLayer(BangortoYMCA);
			map.removeLayer(migrantcentretocollege);
			
//if statement depending on which choice the user selects. 
//WMS Layer - To display route between Bangor SERC to YMCA North Down
		if (selectedRoute === 'BangortoYMCA'){
			document.getElementById("distance").innerHTML = "<b>Distance:</b><br>  (via Castle St) 0.7 mile <br> (via Castle Park Rd and Main St) 0.8 mile <br>  (via Hamilton Rd) 0.9 mile";
			document.getElementById("map").style.paddingBottom = "140px";//Ensures map marginalia isnt covering bottom of map
			BangortoYMCA = new ol.layer.Tile({
		
		     source: new ol.source.TileWMS(
		{
			url: 'http://localhost:8080/geoserver/consulate_test/wms',
		params: {'LAYERS': 'consulate_test:BangortoYMCA'},
			}),
			opacity: 10,
			visible: true,
			
			
		}
		);
		map.addLayer(BangortoYMCA);
		map.getView().setZoom(14);
		map.getView().setCenter(ol.proj.fromLonLat([-5.661746368459245, 54.65617817970178]));//set view to SERC Bangor
			//WMS Layer - To display route between Migrant Centre NI to Southern Regional College
		}else if(selectedRoute === 'migrantcentretocollege'){
			document.getElementById("distance").innerHTML = "<b>Distance:</b> <br> (via Charles St and Shankill St) 0.7 mile";
			document.getElementById("map").style.paddingBottom = "90px";//Ensures map marginalia isnt covering bottom of map
		
				migrantcentretocollege = new ol.layer.Tile({
		
		     source: new ol.source.TileWMS(
		{
			url: 'http://localhost:8080/geoserver/consulate_test/wms',
		params: {'LAYERS': 'consulate_test:migrantcentretocollege'},
			}),
			opacity: 10,
			visible: true,
				}
		);
			map.addLayer(migrantcentretocollege);
			map.getView().setCenter(ol.proj.fromLonLat([-6.337610203590304, 54.46535833945845]));//set view to Migrant Centre
			//WMS Layer - To display route between Poland Consulate to Ulster University Belfast 
			}else if(selectedRoute === 'polandtouu'){
				document.getElementById("distance").innerHTML = "<b>Distance:</b> <br> (via A12) 4 miles <br> (via A24) 2.4 miles";
				document.getElementById("map").style.paddingBottom = "110px";//Ensures map marginalia isnt covering bottom of map
				polandtouu = new ol.layer.Tile({
		
		     source: new ol.source.TileWMS(
		{
			url: 'http://localhost:8080/geoserver/consulate_test/wms',
		params: {'LAYERS': 'consulate_test:polandtouu'},
			}),
			opacity: 10,
			visible: true,
		}
		);
			map.addLayer(polandtouu);
			map.getView().setZoom(12);
			map.getView().setCenter(ol.proj.fromLonLat([-5.939860945909799, 54.57914242786397]));//set view to US Consulate
			
		
			//WMS Layer - To display route between Queens University to US Consulate 
			}else if(selectedRoute === 'qubtous'){
	         document.getElementById("distance").innerHTML = "<b>Distance:</b> <br> (via Stranmillis Rd) 1.1 miles <br> (via Malone Rd/B23) 1.2 miles";
			 document.getElementById("map").style.paddingBottom = "110px";//Ensures map marginalia isnt covering bottom of map
			 
				qubtous = new ol.layer.Tile({
		
		     source: new ol.source.TileWMS(
		{
			url: 'http://localhost:8080/geoserver/consulate_test/wms',
		params: {'LAYERS': 'consulate_test:qubtous'},
			}),
			opacity: 10,
			visible: true,
		}
		);
			map.addLayer(qubtous);
			map.getView().setZoom(12);
			map.getView().setCenter(ol.proj.fromLonLat([-5.9439394496067495, 54.571571779250085]));//set view to US Consulate
			//WMS Layer - To display route between Ulster University Belfast to Horn of Africa (HORNS) People's Aid Northern Ireland (HAPANI)
			}else if(selectedRoute === 'uutohorns'){
				document.getElementById("distance").innerHTML = "<b>Distance:</b> <br> (via A11) 1.7 miles <br> (via A11 and Dublin Rd/A1) 1.4 miles";
			 document.getElementById("map").style.paddingBottom = "110px";//Ensures map marginalia isnt covering bottom of map
				

				uutohorns = new ol.layer.Tile({
		
		     source: new ol.source.TileWMS(
		{
			url: 'http://localhost:8080/geoserver/consulate_test/wms',
		params: {'LAYERS': 'consulate_test:uutohorns'},
			}),
			opacity: 10,
			visible: true,
			
		}
		);
			map.addLayer(uutohorns);
			map.getView().setZoom(12);//Set zoom to route
			map.getView().setCenter(ol.proj.fromLonLat([-5.933780603579811,54.58939978895211]));//set view to (HAPANI)
		}else if (selectedRoute === 'clear'){
			//uses removeLayer to remove a route if the clear option is chosen 
			  map.removeLayer(uutohorns);
			  map.removeLayer(polandtouu);
			  map.removeLayer(qubtous);
			 map.removeLayer(BangortoYMCA);
			 map.removeLayer(migrantcentretocollege);
			 //Clears the text box
			 document.getElementById("distance").innerHTML = "";
			 document.getElementById("map").style.paddingBottom = "40px"; //Clears padding from bottom to avoid large space. 
		}
		
		}
 
 
