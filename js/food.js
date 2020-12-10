// Food属性
// 	x		食物对象的横坐标
// 	y		食物对象的纵坐标
// 	witdh	食物的宽度
// 	height	食物的高度
// 	color	食物的颜色

//创建一个自调用函数   --创建一个新的局部作用域，解决命令冲突

	(function() {
		var position = 'absolute';
		var elements = [];		//存储地图中的元素
		
		function Food(options) {
			var options = options || {};
			this.x = options.x || 0;						//初始化设置默认值
			this.y = options.y || 0;						//初始化设置默认值
			this.width = options.width || 20;				//初始化设置默认值
			this.height = options.height || 20;				//初始化设置默认值
			this.color  = options.color || 'green'; 		//初始化设置默认值
		}
		
		
			//渲染食物
		Food.prototype.render = function(map) {
			//移除食物
			remove();				//解决了蛇遇到食物，食物消失再次出现的问题
			
			//创建动态div,显示在页面上
			
			var div = document.createElement('div');
			map.appendChild(div);
			elements.push(div);		//将创建的div存储到数组当中记录下来
			
			//随机设置动态div的坐标
			this.x = Tool.getrandom(0,map.offsetWidth/this.width - 1)*this.width;
			this.y = Tool.getrandom(0,map.offsetHeight/this.height - 1)*this.height;
			
			div.style.position = position;
			div.style.left = this.x + 'px';
			div.style.top = this.y + 'px';
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px'
			div.style.backgroundColor = this.color;
		}
		
		
		function remove() {
			for(var i=elements.length-1;i>=0;i--){
				elements[i].parentNode.removeChild(elements[i]);	//移除map当中的元素
				
				//splice有两个参数第一个为删除数组元素的位置，第二个为删除数组元素的个数
				elements.splice(i,1);		//删除数组当中的元素，
				
			}
				
			//删除div
			//删除数组中的所有元素,除从数组的最后往前面删除i=element.lenth-1,最大的索引
		}
			//通过window对象，传递出Food
			window.Food = Food;
	})()
	
		//测试代码
		// var food = new Food();
		// var map =  document.getElementById('map');
		// food.render(map);