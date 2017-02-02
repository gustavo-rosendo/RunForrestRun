Button.prototype = new Rectangle();
Button.prototype.constructor = Button;

function Button() {
	const BT_PAUSE 	= "BT_PAUSE";
	const BT_MENU 	= "BT_MENU";
	const BT_LEADERBOARD = "BT_LEADERBOARD";

	this.SPRITE_IDS=[BT_PAUSE, BT_MENU, BT_LEADERBOARD];
					
	this.m_spriteMap=[];

	this.m_scale=0.5;
		
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

		this.m_w *= this.m_scale;
		this.m_h *= this.m_scale;
	}

	this.update = function(dt) {

		if(m_mouseEvent == MOUSE_UP)
		{
			if(this.isTouch(m_current_x, m_current_y)) {
				this.m_selected = true;
				//Event is consumed, reset it to ZERO
				m_mouseEvent = 0;
			}
		}

		if(this.m_selected) {
			this.onClick();

			//reset flag after executing the click
			this.m_selected = false;
		}

		//correct x coord in case the canvas gets resized
		this.m_x = m_canvas.getAttribute('width') - this.m_w;
	}

	this.render = function(context) {
		if(DEBUG_MODE) {
			Button.prototype.render.call(this, context);
		}
		this.m_currentSprite.draw(context, this.m_x, this.m_y, this.m_scale, this.m_scale);
	}

	this.onClick = function() {
		switch(this.m_currentSprite.m_id) {
			case BT_PAUSE:
				g_app.togglePause();
				break;
			case BT_MENU:
				break;
			case BT_LEADERBOARD:
				console.log("Leaderboard button clicked!");
				break;
			default:
				break;
		}
	}
    
    function SendLeaderboard(username, playerScore, country)
    {
    	var leaderboard_url_param = 'username='+username+'&score='+playerScore+'&country='+country;

        var request = new XMLHttpRequest();
        
        request.open("POST", "php/leaderboard_upd.php", true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        
        request.timeout = 10000;
        request.ontimeout = function () {
            console.log("LEADERBOARD SEND TIMEOUT");
        };

        request.onload = function() 
        {
            if(request.response)
            {
                 console.log("LEADERBOARD SENT: "+request.response);
            }
        };

        request.onerror = function(e) 
        {
			console.log("LEADERBOARD SEND ERROR: "+e);
        };
        
        request.send(leaderboard_url_param);
    }
}