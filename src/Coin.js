
Coin.prototype = new Circle();
Coin.prototype.constructor = Coin;

function Coin() {
		
	this.SPRITE_IDS=["COIN"];
					
	this.m_spriteMap=[];
	this.m_isEnabled;
	this.m_scale;
	this.m_score;
	
	this.init = function() {
		for(var i = 0; i < this.SPRITE_IDS.length; i++) {
			this.m_spriteMap.push(-1);
			for(var j = 0; j < this.m_spriteList.length; j++) {
				if(this.m_spriteList[j].m_id == this.SPRITE_IDS[i]) {
					this.m_spriteMap[i] = j;
					this.m_currentSprite = this.m_spriteList[j];					
				}
			}
		}
		this.m_isEnabled = true;
		
		//Scale ranges from 0.5 to 1.5
		this.m_scale = Math.random() + 0.5;
		//Score depends on the scale
		this.m_score = Math.ceil(this.m_scale * 10.0); 
		
		//Update Coin's dimensions
		this.m_w *= this.m_scale;
		this.m_h *= this.m_scale;
	}
	
	this.update = function(dt) {
		this.m_x += this.m_velocity;
	}
	
	this.render = function(context) {
		if(DEBUG_MODE) {
			context.beginPath();
			//Add radius to draw the sprite correctly in the middle of the circle
			context.arc(this.m_x + this.m_w, this.m_y + this.m_w, this.m_w, 0, 2*Math.PI);
			context.stroke();
		}
		if(this.m_isEnabled) {
			this.m_currentSprite.draw(context, this.m_x, this.m_y, this.m_scale, this.m_scale);
		}
	}
	
	this.isCollisionCharacter = function(character) {
		if(!character) return;
		
		var isColliding = character.isCollisionCircle(this);
		if(isColliding) {
			//update the total player score
			g_playerScore += this.m_score;
			//make the coin disapear
			this.m_isEnabled = false;
			
			if(g_sound_manager) {
				g_sound_manager.playSoundCollectCoin();
			}
		}
	}
}