var m_xmlDoc;

var SpriteManager = (function()
{
	var instance;
	
	function create() {
			//PRIVATE variables and functions
			m_spriteList=[];
			
			var loadFromXML = function(xmlPath)
			{
				var xmlhttp = new XMLHttpRequest();
				
				xmlhttp.onreadystatechange = function ()
				{
					if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
					{
						m_xmlDoc = xmlhttp.responseXML;
					}
				}
				
				xmlhttp.open('GET', xmlPath, false);
				xmlhttp.send();
			}
			
			var parseXML = function()
			{
				var spriteDef = m_xmlDoc.getElementsByTagName("sprite");
				
				for(var i = 0; i < spriteDef.length; i++)
				{
					var spriteID = spriteDef[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
					var imgSrc = spriteDef[i].getElementsByTagName("img_src")[0].childNodes[0].nodeValue;
					var width = spriteDef[i].getElementsByTagName("width")[0].childNodes[0].nodeValue;
					var height = spriteDef[i].getElementsByTagName("height")[0].childNodes[0].nodeValue;
					var frameIndex = spriteDef[i].getElementsByTagName("frame_index")[0].childNodes[0].nodeValue;
					var numFrames = spriteDef[i].getElementsByTagName("num_frames")[0].childNodes[0].nodeValue;
					var ticksPerFrame = spriteDef[i].getElementsByTagName("ticks_per_frame")[0].childNodes[0].nodeValue;
					var loop = spriteDef[i].getElementsByTagName("loop")[0].childNodes[0].nodeValue;
					var bounceLoop = spriteDef[i].getElementsByTagName("bounce_loop")[0].childNodes[0].nodeValue;
					var speed = spriteDef[i].getElementsByTagName("speed")[0].childNodes[0].nodeValue;
					
					width = Number(width);
					height = Number(height);
					frameIndex = Number(frameIndex);
					numFrames = Number(numFrames);
					ticksPerFrame = Number(ticksPerFrame);
					speed = Number(speed);
					
					var toBoolean = function (string) {
						switch(string.toLowerCase().trim()){
							case "true": case "yes": case "1": return true;
							default: return false;
						}
					};
					loop = toBoolean(loop);
					bounceLoop = toBoolean(bounceLoop);
										
					if(imgSrc != undefined)
					{
						m_spriteList.push(new Sprite());
						m_spriteList[i].init(spriteID, imgSrc, width, height,
												  frameIndex, numFrames, 
												  ticksPerFrame, loop, bounceLoop, speed);
					}
					else
					{
						console.log("-> Sprite.parseXML() - Error parsing Sprite from XML file.");
						alert("Error loading game sprite image.");
					}
				}
				
			}
			
		return {
			//PUBLIC variables and functions
			init: function(xmlPath)
			{
				loadFromXML(xmlPath);
			},			
			update: function(dt)
			{
				if(m_xmlDoc != undefined)
				{
					parseXML();
					m_xmlDoc = undefined; //make sure the XML is going to be parsed only once
				}
				
				for(var i = 0; i < m_spriteList.length; i++)
				{
					m_spriteList[i].update(dt);
				}
			},
			//** There is no "render" method here since all the rendering 
			//   should be managed by the SceneManager and the objects
			getSpriteById: function(spriteID)
			{
				var sprite;
				for(var i = 0; i < m_spriteList.length; i++) {
					if(m_spriteList[i].m_id == spriteID) {
						sprite = m_spriteList[i];
					}
				}
				return sprite;
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