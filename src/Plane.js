
Plane.prototype = new Object();
Plane.prototype.constructor = Plane;

function Plane()
{
	this.init = function()
	{
		
	}
	
	this.restart = function() {
		
	}

	this.isCollision = function(plane)
	{
		if(plane.m_x + plane.m_w < this.m_x) return false;
		if(plane.m_y + plane.m_h < this.m_y) return false;
		if(this.m_x + this.m_w < plane.m_x) return false;
		if(this.m_y + this.m_h < plane.m_y) return false;
		return true;
	}
	
	this.update = function(dt)
	{

	}
	
	this.render = function(context)
	{
		context.fillRect(m_x, m_y, m_w, m_h);
	}
}

Plane.prototype.toString = function()
{
	return '[Plane "' + this.m_id + '"]';
}