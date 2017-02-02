
Background.prototype = new Rectangle();
Background.prototype.constructor = Background;

function Background() {
		
	this.SPRITE_IDS=["BG_FAR", "BG_MID", "BG_CLOSE"];
					
	this.m_spriteMap=[];
		
	this.init = function() {
		for(var i = 0; i < this.SPRITE_IDS.length; i++) {
			this.m_spriteMap.push(-1);
			for(var j = 0; j < this.m_spriteList.length; j++) {
				if(this.m_spriteList[j].m_id == this.SPRITE_IDS[i]) {
					this.m_spriteMap[i] = j;
					this.m_currentSprite = this.m_spriteList[j];					
				}

				//Just to set these two global variables used to spawn the coins
				if(this.m_spriteList[j].m_id == this.SPRITE_IDS[0]) //BG_FAR
				{
					g_backgroundWidth = this.m_spriteList[j].m_width;
					g_backgroundHeight = this.m_spriteList[j].m_height;
				}
			}
		}
	}

	this.restart = function() {
		this.m_x = 0;
	}
	
	this.update = function(dt) {
		this.m_x += this.m_velocity;
		
		//when the background image is about to go offscreen 
		//put it back to the origin
		if(this.m_x <= -this.m_currentSprite.m_width)
		{
			this.m_x = 0;
		}
	}
	
	this.render = function(context) {
		if(DEBUG_MODE) {
			context.strokeRect(this.m_x, this.m_y, this.m_w, this.m_h); //for collision detection
			//Parent.prototype.render.call(context); //=> doesn't work!
		}
		this.m_currentSprite.draw(context, this.m_x, this.m_y);
		//Draw a copy of the same sprite outside of the screen 
		//to give the impression of an endless panorama
		this.m_currentSprite.draw(context, this.m_x + this.m_currentSprite.m_width, this.m_y);		
	}
}