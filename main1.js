

window.onload = function main()//页面加载完成后调用此函数
	{
		//获取页面中id为webgl的canvas元素
		var canvas = document.getElementById("webgl");
		if(!canvas)//获取失败
		{
			alert("获取canvas元素失败！");
			return;
		}
		
		//利用辅助程序文件中的功能获取WebGL上下文
		//成功则后面可通过gl来调用WebGL的函数
		var gl = WebGLUtils.setupWebGL(canvas);
		if(!gl)//失败则弹出信息
		{
			alert("获取WebGL上下文失败！");
			return;
		}
				
		//顶点位置数据数组（有两个三角形构成一个正方形）
		var vertices = [
			vec2(-1,-1),vec2(0,-1),vec2(-1,1),vec2(0,1),
			vec2(0,-1),vec2(1,-1),vec2(0,1),vec2(1,1), //background  0-7 8
			vec2(-0.88,-0.88),vec2(0.88,-0.88),vec2(0.88,0.88),vec2(-0.88,0.88),//外围线框 8-11 4
			vec2(-0.82,0),vec2(-0.7,0),vec2(-0.72,0.8),vec2(-0.6,0.8),  	//   12-15 4
			vec2(-0.8,0),vec2(-0.4,0),vec2(-0.7,0.1),vec2(-0.4,0.1),		//L  16-19 4
			vec2(-0.1,-0.05),vec2(0.03,0),vec2(-0.29,0.4),vec2(-0.15,0.4),	//   20-23 4
			vec2(-0.30,-0.4),vec2(-0.16,-0.4),vec2(0.16,0.4),vec2(0.29,0.4),//y  24-27 4
			vec2(0.39,0),vec2(0.5,0),vec2(0.39,0.8),vec2(0.5,0.8),			//   28-31 4
			vec2(0.5,0.3),vec2(0.6,0.35),vec2(0.5,0.4),vec2(0.6,0.45),		//   32-35 4
			vec2(0.6,0.35),vec2(0.71,0.3),vec2(0.6,0.45),vec2(0.82,0.38),  	//   36-39 4
			vec2(0.71,0),vec2(0.82,0),vec2(0.71,0.3),vec2(0.82,0.38),  		//h  40-43 4
			
			vec2(0.3,-0.7),vec2(0.7,-0.7),vec2(0.3,-0.3),vec2(0.7,-0.3),	//1black 44-47 4
			vec2(0.39,-0.48),vec2(0.61,-0.48),vec2(0.35,-0.42),vec2(0.43,-0.34),//       48-51 4
			vec2(0.39,-0.48),vec2(0.61,-0.48),vec2(0.57,-0.34),vec2(0.65,-0.42),//       52-55 4
			vec2(0.42,-0.7),vec2(0.61,-0.52),vec2(0.35,-0.62),vec2(0.39,-0.52),//        56-59 4
			vec2(0.42,-0.7),vec2(0.58,-0.7),vec2(0.61,-0.52),vec2(0.65,-0.62), //2white 60-63 4
			vec2(0.3,-0.52),vec2(0.7,-0.52),vec2(0.3,-0.48),vec2(0.7,-0.48),   //       64-67 4
			vec2(0.61,-0.57),vec2(0.64,-0.57),vec2(0.61,-0.52),vec2(0.64,-0.52),//3green 68-71 4
			vec2(0.28,-0.6),vec2(0.3,-0.58),vec2(0.25,-0.58),vec2(0.3,-0.52),	//       72-75 4
			vec2(0.7,-0.58),vec2(0.72,-0.6),vec2(0.7,-0.52),vec2(0.75,-0.58),	//1      76-79 4
			vec2(0.42,-0.42),vec2(0.44,-0.42),vec2(0.42,-0.4),vec2(0.44,-0.4),  //  80-83 4
			vec2(0.56,-0.42),vec2(0.58,-0.42),vec2(0.56,-0.4),vec2(0.58,-0.4),	  //1 84-87 4		
			vec2(0.34,-0.72),vec2(0.39,-0.72),vec2(0.34,-0.695),vec2(0.39,-0.695),	//    88-91 4
			vec2(0.61,-0.72),vec2(0.66,-0.72),vec2(0.61,-0.695),vec2(0.66,-0.695),	//4yellow  92-95 4
			vec2(0.48,-0.48),vec2(0.52,-0.48),vec2(0.5,-0.455)  //5red  96-98 3
			
			];
			
		//顶点颜色数据数组（用三角条带绘制正方形）
		var colors=[
			vec3(0.59,0.44,0.62),vec3(0.90,0.44,0.62),vec3(0.59,0.44,0.62),vec3(0.90,0.44,0.62),
			vec3(0.90,0.44,0.62),vec3(0.94,0.82,0.97),vec3(0.90,0.44,0.62),vec3(0.94,0.82,0.97), //background
			vec3(1.00,0.63,0.74),vec3(0.85,0.42,0.45),vec3(0.91,0.23,0.46),vec3(1.00,0.75,0.85), //外围线框
			vec3(0.99,0.61,0.60),vec3(0.99,0.61,0.60),vec3(0.99,0.61,0.60),vec3(0.99,0.61,0.60),
			vec3(0.99,0.61,0.60),vec3(0.99,0.61,0.60),vec3(0.99,0.61,0.60),vec3(0.99,0.61,0.60), //L
			vec3(0.97,0.80,0.68),vec3(0.97,0.80,0.68),vec3(0.97,0.80,0.68),vec3(0.97,0.80,0.68),
			vec3(0.97,0.80,0.68),vec3(0.97,0.80,0.68),vec3(0.97,0.80,0.68),vec3(0.97,0.80,0.68),  //y	
			vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),
			vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),
			vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),
			vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),vec3(0.98,0.68,0.73),  //h
			
			vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),	//1black
			vec3(1,1,1),vec3(1,1,1),vec3(1,1,1),vec3(1,1,1),	
			vec3(1,1,1),vec3(1,1,1),vec3(1,1,1),vec3(1,1,1),	
			vec3(1,1,1),vec3(1,1,1),vec3(1,1,1),vec3(1,1,1),	
			vec3(1,1,1),vec3(1,1,1),vec3(1,1,1),vec3(1,1,1),	//2white
			vec3(0.81,0.90,0.66),vec3(0.81,0.90,0.66),vec3(0.81,0.90,0.66),vec3(0.81,0.90,0.66),
			vec3(0.81,0.90,0.66),vec3(0.81,0.90,0.66),vec3(0.81,0.90,0.66),vec3(0.81,0.90,0.66),	//3green
			vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),
			vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),	//1
			vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),
			vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),vec3(0.35,0.35,0.35),    //1
			vec3(0.99,0.77,0.32),vec3(0.99,0.77,0.32),vec3(0.99,0.77,0.32),vec3(0.99,0.77,0.32),
			vec3(0.99,0.77,0.32),vec3(0.99,0.77,0.32),vec3(0.99,0.77,0.32),vec3(0.99,0.77,0.32),	//4yellow
			vec3(0.99,0.59,0.57),vec3(0.99,0.59,0.57),vec3(0.99,0.59,0.57)  	//5red
			
			];	

		//设置WebGL相关属性
		//设置视口（此处视口占满整个canvas）
		gl.viewport(0,//视口左边界距离canvas左边界距离
					0,//视口下边界距离canvas上边界距离
					canvas.width,//视口宽度
					canvas.height);//视口高度
		gl.clearColor(0.0,0.0,0.0,1.0);//设置背景色为黑色
	
		//加载shader程序并为shader中attribute变量提供数据
		//加载id分别为"vertex-shader"和"fragment-shader"的shader程序
		//并进行编译和链接，返回shader程序对象program
		var program = initShaders(gl,"vertex-shader","fragment-shader")	;
		gl.useProgram(program);
		//将顶点属性数据传输到GPU
		var verticesBufferId = gl.createBuffer();//创建buffer
		//将id为verticesBufferId的buffer绑定为当前Array Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER,verticesBufferId);
		//为当前Array Buffer提供数据，传输到GPU
		gl.bufferData(gl.ARRAY_BUFFER,flatten(vertices),gl.STATIC_DRAW);
		
		//为shader属性变量与buffer数据建立关联
		//获取名称为"a_Position"的shader attribute变量的位置
		var a_Position = gl.getAttribLocation(program,"a_Position");
		if(a_Position < 0)//getAttribLocation获取失败则返回-1
		{
			alert("获取attribute变量a_Position失败！");
			return;
		}
		//指定利用当前Array Buffer为a_Position提供数据具体方式
		gl.vertexAttribPointer(a_Position,//shader attribute变量位置
			2,			//每个顶点属性有2个分量
			gl.FLOAT,	//数组数据类型（浮点型）
			false,		//不进行归一化处理
			0,			//相邻顶点属性地址相差0个字节
			0);			//第一个顶点属性在Buffer中偏移量为0字节
		gl.enableVertexAttribArray(a_Position);//启用顶点属性数组	
		
		//将顶点颜色属性数据传输到GPU
		var colorsBufferId = gl.createBuffer();//创建buffer
		//将id为colorsBufferIdd的buffer绑定为当前Array Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER,colorsBufferId);
		//为当前Array Buffer提供数据，传输到GPU
		gl.bufferData(gl.ARRAY_BUFFER,//Buffer类型
			flatten(colors),//Buffer数据来源，flatten将colors转换为GPU可接受的格式
			gl.STATIC_DRAW);//表明将如何使用Buffer（STATIC_DRAW表明是一次提供数据，多遍绘制）
		
		//为shader属性变量与buffer数据建立关联
		//获取名称为"a_Color"的shader attribute变量的位置
		var a_Color = gl.getAttribLocation(program,"a_Color");
		if(a_Color < 0)//getAttribLocation获取失败则返回-1
		{
			alert("获取attribute变量a_Color失败！");
			return;
		}
		//指定利用当前Array Buffer为a_Position提供数据具体方式
		gl.vertexAttribPointer(a_Color,//shader attribute变量位置
			3,			//每个顶点属性有2个分量
			gl.FLOAT,	//数组数据类型（浮点型）
			false,		//不进行归一化处理
			0,			//相邻顶点属性地址相差0个字节
			0);			//第一个顶点属性在Buffer中偏移量为0字节
		gl.enableVertexAttribArray(a_Color);//启用顶点属性数组		
		
		//进行绘制
		render(gl);
	};
	
//绘制函数，参数为WebGL上下文
function render(gl)
{
	gl.clear(gl.COLOR_BUFFER_BIT);//用背景色擦除窗口内容
	//使用顶点数组进行绘制
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形
			0,	//从第0个顶点属性数据开始绘制
			8);	//使用6个顶点属性数据
	gl.drawArrays(gl.LINE_LOOP,//绘制图元类型为三角形
			8,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据	
	
	//L	
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			12,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据	
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			16,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据
	
	//y
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			20,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据	
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			24,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据
			
	//h
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			28,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据	
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			32,	//从第0个顶点属性数据开始绘制
			8);	//使用6个顶点属性数据
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			40,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据			

	//1black+2white
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			44,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			48,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			52,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据	
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			56,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			60,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			64,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据				
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			68,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据				
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			72,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据	
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			76,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据				
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			80,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据				
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			84,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据				
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			88,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据				
	gl.drawArrays(gl.TRIANGLE_STRIP,//绘制图元类型为三角形  
			92,	//从第0个顶点属性数据开始绘制
			4);	//使用6个顶点属性数据
	gl.drawArrays(gl.TRIANGLES,//绘制图元类型为三角形
			96,	//从第0个顶点属性数据开始绘制
			3);	//使用6个顶点属性数据	




}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	