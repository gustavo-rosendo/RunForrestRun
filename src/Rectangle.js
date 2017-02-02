
Rectangle.prototype = new Object();
Rectangle.prototype.constructor = Rectangle;

function Rectangle()
{
	this.m_selected = false;
	
	this.init = function()
	{

	}
	
	this.isCollision = function(rect)
	{
		if(rect.m_x + rect.m_w < this.m_x) return false;
		if(rect.m_y + rect.m_h < this.m_y) return false;
		if(this.m_x + this.m_w < rect.m_x) return false;
		if(this.m_y + this.m_h < rect.m_y) return false;
		return true;
	}
	
	this.isCollisionCircle = function(circle)
	{
		var isColliding = false;
		
		// var centerRect_x = this.m_x + (this.m_w / 2.0);
		// var centerRect_y = this.m_y + (this.m_h / 2.0);
		
		//correct the circle's coordinates to reflect the actual sprite
		var circleX = circle.m_x + circle.m_w;
		var circleY = circle.m_y + circle.m_w;
		
		var closestPoint_x;
		if(circleX >= this.m_x + this.m_w) {
			closestPoint_x = this.m_x + this.m_w;	
		}
		else if(circleX <= this.m_x) {
			closestPoint_x = this.m_x;
		}
		else {
			closestPoint_x = circleX;
		}
		
		var closestPoint_y;
		if(circleY <= this.m_y) {
			closestPoint_y = this.m_y;
		}
		else if(circleY >= this.m_y + this.m_h) {
				closestPoint_y = this.m_y + this.m_h;
		}
		else {
			closestPoint_y = circleY;
		}
		
		//check collision with closest point
		if(circleX >= this.m_x && circleX <= (this.m_x + this.m_w) 
		   && circleY >= this.m_y && circleY <= (this.m_y + this.m_h)) 
		{
			isColliding = true;   
		}
		
		//use Pythagoras theorem to check 
		var a = circleX - closestPoint_x;
		var b = circleY - closestPoint_y;
		var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
		
		// Collision happened
		if(c <= circle.m_w) {
			isColliding = true;
		}
		
		return isColliding;
	}
	
	this.isTouch = function(x, y)
	{
		if(x < this.m_x) return false;
		if(y < this.m_y) return false;
		if(x > this.m_x + this.m_w) return false;
		if(y > this.m_y + this.m_h) return false;
		return true;
	}
	
	this.update = function(dt)
	{
		if(m_mouseEvent == MOUSE_DOWN)
		{
			if(this.isTouch(m_current_x, m_current_y))
			{
				this.m_selected = true;
				//Event is consumed, reset it to ZERO
				m_mouseEvent = 0;
			}
		}
		else if(m_mouseEvent == MOUSE_UP && this.m_selected)
		{
			this.m_selected = false;
			//Event is consumed, reset it to ZERO
			m_mouseEvent = 0;
		}
		else
		{
			if(this.m_selected)
			{
				m_dragDistance_x = (m_mouse_x - m_current_x) / 2;
				m_dragDistance_y = (m_mouse_y - m_current_y) / 2;
				
				// Dragging feature: Deprecated!
				// this.m_x += m_dragDistance_x;
				// this.m_y += m_dragDistance_y;
				
				m_current_x += m_dragDistance_x;
				m_current_y += m_dragDistance_y;
			}
		}

	}
	
	this.render = function(context)
	{
		//context.fillRect(this.m_x, this.m_y, this.m_w, this.m_h);
		context.strokeRect(this.m_x, this.m_y, this.m_w, this.m_h);
	}
}

Rectangle.prototype.toString = function()
{
	return '[Rectangle "' + this.m_id + ', x: '+ this.m_x +', y: '+ this.m_y +', w: '+ this.m_w +', h: '+ this.m_h +'"]';
}