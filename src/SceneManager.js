var xmlDoc;

var SceneManager = (function()
{	
	var instance;

	function create() {
		objList=[];
		m_character=null;
		
		var parseXML = function()
		{
			var objArray = xmlDoc.getElementsByTagName("object");
			
			for(i = 0; i < objArray.length; i++)
			{
				var id = objArray[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
				var type = objArray[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
				var position = objArray[i].getElementsByTagName("position")[0].childNodes[0].nodeValue;
				var velocity = objArray[i].getElementsByTagName("velocity")[0].childNodes[0].nodeValue;
								
				var posCoords = position.split(",");
							
				var spriteIDs = objArray[i].getElementsByTagName("sprite_id");
				var spriteList = [];
				for(var j = 0; j < spriteIDs.length; j++) {
					var spriteID = spriteIDs[j].childNodes[0].nodeValue;
					var spriteObj = SpriteManager.getInstance().getSpriteById(spriteID);
					spriteList.push(spriteObj);
				}
			
				if(id == "CHARACTER")
				{
					objList.push(new Character());		
					m_character = objList[i];
				}
				else if(id == "COIN")
				{
					objList.push(new CoinManager());
				}
				if(id == "BACKGROUND")
				{
					objList.push(new Background());
				}
				if(id == "OBSTACLE")
				{
					objList.push(new ObstacleManager());
				}
				else if(id == "PLANE")
				{
					objList.push(new Plane());
				}
				else if(id == "BUTTON") 
				{
					objList.push(new Button());
					posCoords[0] = m_canvas.getAttribute('width') - Number(posCoords[2]);
				}
				
				objList[i].m_id = id;
				objList[i].m_type = type;
				objList[i].m_position = position;
				objList[i].m_x = Number(posCoords[0]);
				objList[i].m_y = Number(posCoords[1]); 
				objList[i].m_w = Number(posCoords[2]); 
				objList[i].m_h = Number(posCoords[3]);
				objList[i].m_velocity = Number(velocity);
				objList[i].m_spriteList = spriteList;
			}
			
			// Init the objects in a different loop 
			// to avoid failure of objects that depend on info from others
			for(i = 0; i < objArray.length; i++) {
				objList[i].init();
			}

			//set it back to undefined to avoid this method from being called again
			xmlDoc = undefined;
		}
		
		return {
			init: function(configFile)
			{
				var xmlhttp = new XMLHttpRequest();
				
				xmlhttp.onreadystatechange = function()
				{
					if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
					{
						xmlDoc = xmlhttp.responseXML;
					}
				}
				xmlhttp.open('GET', configFile, false);
				xmlhttp.send();		
			},

			restart: function()
			{
				for(i = 0; i < objList.length; i++) {
					objList[i].restart();
				}
			},
			
			update: function(dt)
			{
				if(xmlDoc != undefined)
				{
					parseXML();
				}
				
				for(i = 0; i < objList.length; i++)
				{
					objList[i].update(dt);
				}
			},
			
			render: function(context)
			{
				for(i = 0; i < objList.length; i++)
				{
					//alert(this.objList[i]);
					objList[i].render(context);
				}
			},
			getCharacter: function()
			{
				return m_character;
			}
		};
	}
	
	return {
		getInstance: function() {
			if(!instance) {
				instance = create();
			}
			return instance;
		}
	};
})();