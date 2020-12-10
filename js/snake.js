(function(){
	var position = 'absolute';
	var elements = [];
	//创建Snake的构造函数
	function Snake(options) {
		var options = options || {};
		
		this.body = [
			{x:3,y:2,color:'red'},
			{x:2,y:2,color:'green'},
			{x:1,y:2,color:'green'}
		];
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.direction = options.direction || 'right';
	}
	

		//将蛇渲染到map上面的方法
	
	Snake.prototype.render = function(map) {
		//删除之前的蛇
		remove();
		//创建蛇
		for(var i=0,len = this.body.length;i<len;i++)
		{
			var div = document.createElement('div');
				map.appendChild(div);
				elements.push(div);
				
				div.style.position = position;
				div.style.width	= this.width + 'px';
				div.style.height = this.height + 'px';
				div.style.left = this.body[i].x*this.width + 'px';
				div.style.top = this.body[i].y*this.height + 'px';
				div.style.backgroundColor = this.body[i].color;
		}
	}
	
	Snake.prototype.move = function(food,map) {
		//蛇身移动，使得处蛇头之外的部分到他们前一个位置
		for(var i=this.body.length-1;i>0;i--){
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}
		//蛇头移动
		switch(this.direction){
			case 'top':
			this.body[0].y = this.body[0].y - 1;
			break;
			case 'right':
			this.body[0].x = this.body[0].x + 1;
			break;
			case 'bottom':
			this.body[0].y = this.body[0].y + 1;
			break;
			case 'left':
			this.body[0].x = this.body[0].x - 1;
			break;
		}
		
		//蛇吃食物，蛇边长一节，食物重新渲染到页面上
		var headX = this.body[0].x*this.width;
		var headY = this.body[0].y*this.height;
		if(headX===food.x && headY===food.y){
			//蛇边长一节
			var last = this.body[this.body.length-1];
			// this.body.push({
			// 	x:last.x,
			// 	y:last.y,
			// 	color:last.color
			// })
			//食物重新渲染到页面上
			var obj= {};
			extend(last,obj);
			this.body.push(obj);
			food.render(map);
		}
		
	}
		function remove() {
			for(var i=elements.length-1;i>=0;i--){
				//删除蛇
				elements[i].parentNode.removeChild(elements[i]);
				//删除数组的元素
				elements.splice(i,1);
			}
		}
		
		function extend(parent,child){
			for(var key in parent){
				if(child[key]){
					continue;
				}
				child[key] = parent[key];
			}
		}
			window.Snake = Snake;
})()
		
		