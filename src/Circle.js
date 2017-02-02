
Circle.prototype = new Object();
Circle.prototype.constructor = Circle;

function Circle()
{	
	this.init = function()
	{
		
	}
	
	this.isCollision = function(circle)
	{
		//use Pythagoras theorem to check 
		var a = circle.m_x - this.m_x;
		var b = circle.m_y - this.m_y;
		var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
		
		// Collision happened
		if(c <= (circle.m_w + this.m_w)) return true;
		
		return false;
	}
	
	this.isTouch = function(x, y)
	{
		//use Pythagoras theorem to check 
		var a = x - this.m_x;
		var b = y - this.m_y;
		var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
		
		// Selection happened
		if(c <= this.m_w) return true;
		
		return false;
	}
	
	
	this.update = function(dt)
	{
		if(m_mouseEvent == MOUSE_DOWN)
		{
			if(this.isTouch(m_current_x, m_current_y))
			{
				this.m_selected = true;
			}
		}
		else if(m_mouseEvent == MOUSE_UP || m_unselectAll)
		{
			this.m_selected = false;
		}
		else
		{
			if(this.m_selected)
			{
				m_dragDistance_x = (m_mouse_x - m_current_x) / 2;
				m_dragDistance_y = (m_mouse_y - m_current_y) / 2;
				
				this.m_x += m_dragDistance_x;
				this.m_y += m_dragDistance_y;
				
				m_current_x += m_dragDistance_x;
				m_current_y += m_dragDistance_y;
			}
		}
	}
	
	this.render = function(context)
	{
		context.beginPath();
		context.arc(this.m_x, this.m_y, this.m_w, 0, 2*Math.PI);
		context.stroke();
	}
}

Circle.prototype.toString = function()
{
	return '[Circle "' + this.m_id + ', x: '+ this.m_x +', y: '+ this.m_y +', w: '+ this.m_w +'"]';
}