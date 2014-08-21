		var paper = Raphael('caja', screen.width - 0, screen.height - 90),
  //set = paper.set(),
  $caja = $('#caja'),
	 $btnCrearRect = $('.rectangle'),
		$rotate = $('.rotate'),
		$translatex = $('.translatex'),
		$translatey = $('.translatey'),
		$ancho = $('.ancho'),
		$alto = $('.alto'),
		$escala = $('.escala'),
		$eliminar = $('.eliminar'),
		$btnMoverPizarra = $('#change'),
		$pizarra = $('.pizarra'),
		$btnCrearCircle = $('.circule'),
		$btnCrearRaya = $('.raya'),
		$btnCrearTexto = $('.texto'),
		$btnCambiarTexto = $('.ctexto'),
		$parrafo = $('.parrafo'),
		$btnCrearForma = $('.cforma'),
		$btnCrearPtos = $('.cPtos'),
		$settingBox = $('#settingBox'),
		$fondoPizarra = $('.fondo-pizarra'),
		$body = $('body'),
		svg_ = document.getElementsByTagName('svg')[0],
		$svg_ = $(svg_),
		elActual = null,
		mover = !true,
		actual = null,ant = null,
		ruta = 1;

		$body.width(screen.width-0)
		$body.height(683)
		$svg_.attr('id', 'svg_pizarra1');
		$svg_.attr('class', 'svg_pizarra');
		$fondoPizarra.width(screen.width-0)
		$fondoPizarra.height(683)
		$pizarra[0].width = screen.width -0
		$pizarra[0].height = 683

		//console.log($pizarra[0])
		Raphael.el.setCustomAttributes = function() {
			var tipoEle = this.node.tagName;
			switch(tipoEle){
				case'text':
					ctmAttrs = {
						'font-size':20
					}
				break;
				case'rect':
					ctmAttrs = {
						fill:"rgba(0,0,0,0)"				
					}
				break;
				case'circle':
				ctmAttrs = {
						fill:"rgba(0,0,0,0)"				
				}
				break;
				case'path':
				ctmAttrs = {
					"stroke-width":2
					,title:"linea"
				}
				break;
			}

			this.mouseup(function(e){
    	var x = 0, y = 0;
    	if(actual._&&actual._['bbox']){
    		x = actual._['bbox']['cx'], y = actual._['bbox']['cy'];
    		//console.log(x + " * "+ y)
    	}
    	var datos = actual.getBBox(false);
					//console.log(datos)
					//console.log(datos.x+" , "+datos.y)

					$alto.val(this.height)
					$ancho.val(this.width)
					$translatex.val(((x)?x:datos.x))
					$translatey.val(((y)?y:datos.y))
					if(this._&&this._['deg']!=undefined&&this._['sx']!=undefined){
						$rotate.val(this._['deg'])
						$escala.val(this._['sx'])
					}
    })

			this.hover(function(){
				this.attr({
					cursor:"move"
				})
			})
			this.click(function(event) {
				showSettingBox({
					element:this.node.tagName
				})
			});
			this.attr(ctmAttrs)

			return this
		}
		/*
		*/
		$svg_.dblclick(function(event) {
			//console.log(event)
			crearCajaTexto({
				multiline:false,
				x:event.pageX,
				y:event.pageY,
				value:"[  ]"
			},function(value){
				//console.log(value)
				crearTexto({
					texto:value,
					x:event.pageX,
					y:event.pageY
				})
			})
			/*
			*/
		});
		svg_.onmousedown = function(e){
			//sconsole.log(e.x + " , "+e.y)
			actual = paper.getElementByPoint(e.x,e.y);
			//actual = ele
			mover = !mover
			console.log(actual)
		}

		svg_.onmouseup = function(e){
			mover = !mover
		}

		svg_.onmousemove = function(e){
			//console.log(e.x + " , "+e.y)
			if(actual&&mover){
				var deegre = actual._['deg'],
				scale = actual._['sx'];
				var Xdes = 0,Ydes = 0;
					if(actual.data("objectName")&&(actual.data("objectName")=="objAmorfo"||actual.data("objectName")=="objPunto")){
						//console.log(actual)
						Xdes = actual.realPath[0][1],Ydes = actual.realPath[0][2];
						//console.log(Xdes + " , "+Ydes)
					}
				actual.transform("t"+(e.x - Xdes)+","+(e.y - Ydes)+"r"+deegre+"s"+scale)
			}
		}


	$pizarra.ubicacion = "atras"

	$btnMoverPizarra.click(function(event) {
		//console.log($pizarra)
		if($pizarra.ubicacion == "atras"){
			$pizarra.css({
				'z-index':'4'
			})
			$pizarra.ubicacion = "adelante"
		}
		else{
				$pizarra.css({
				'z-index':'2'
			})
			$pizarra.ubicacion = "atras"
		}
	});

			function showSettingBox (opt) {
					var Element,rect,circle,text,path,default_;
					Element = function() {
						this.attributes = ["escala","rotacion","color-fondo","color-borde"]
					}

					rect = new Element()
					circle = new Element()
					text = new Element()
					path = new Element()

					rect.attributes.push("ancho")
					rect.attributes.push("alto")
					circle.attributes.splice(circle.attributes.indexOf("rotacion"),1)
					text.attributes.splice(text.attributes.indexOf("color-borde"),1)
					text.attributes.push("font-size")
					text.attributes.push("texto")

					default_ = {
						x:0,
						y:0,
						element:"rect",
					}

					opt = $.extend(default_, opt);

					switch(true){
						case(opt.element == "rect"):
							opt.attributes = rect.attributes
						break;
						case(opt.element == "circle"):
							opt.attributes = circle.attributes
						break;
						case(opt.element == "text"):
							opt.attributes = text.attributes
						break;
						case(opt.element == "path"):
							opt.attributes = path.attributes
						break;
					}
					console.log(opt)
					$settingBox.addClass('show')
					$settingBox.removeClass('hide')
					var timer = setTimeout(function(){
							$settingBox.addClass('hide')
							$settingBox.removeClass('show')						
					},1500)
					$settingBox.mouseover(function(event) {
						clearTimeout(timer)
					});
					var ocultar = false
					$settingBox.mouseleave(function(event) {
							console.log("leave")
							$settingBox.removeClass('show')						
							$settingBox.addClass('hide')
					});



			}

			function crearCajaTexto (opt,callback) {
				var default_ = {
					multiline:false,//soportara? mas de 1 linea.multiline(textarea) , oneline(input(type="text"))
					x:100,
					y:100,
					cols:3,
					rows:1,
					value:null			
				}
				opt = $.extend(default_, opt);
				var input = null, $input = null
					if(opt.multiline){
						input = document.createElement("textarea");
						$input = $(input);
						$input.attr("cols",opt.cols)
						$input.attr("rows",opt.rows)
					}else{
						 input = document.createElement('input')
						 input.setAttribute('type','text')
							$input = $(input);
							$input.css({
								width:"150px",
							})
					}
						
						$input.val(opt.value)
						$input.css({
							background:"transparent",
							outline:"none",
							padding:"0px 5px",
							"font-size":"20px",
							position:"absolute",
							top:((opt.y)?((opt.y)+"px"):"100px"),
							left:((opt.x)?((opt.x)+"px"):"100px"),
							border:"1px dotted #333"
						})
						$caja.append($input)

						$input.mouseout(function(event) {
							callback($input.val())
							$input.remove()
						});
			
			}
		function crearRectangulo (opt){
				var default_ = {
					x : 0,//posicion en el eje x
					y : 0,//posicion en el eje y
					width: 10,//anchura
					height: 10,//altura
					color:"rgba(0,0,0,0)",//color de fondo
					punta:0//redondes de los vertices,a mayor valor mas redonda sera la punta
				}

				opt = $.extend(default_, opt);
				//console.log(opt)
    var newCuadrado = paper.rect(opt.x, opt.y, opt.width, opt.height,opt.punta)
    .setCustomAttributes()
			 //set.push(newCuadrado)  
    //.draggable(); 
	   // watchElements();
		}

		function crearRaya (opt) {
			var default_ = {
				points:["0,0","50,50"],
				ancho:3,
				objectName:null
			}
				opt = $.extend(default_,opt)
				var path = "", l = opt.points.length-1;
				$.each(opt.points, function(index, val) {
					//console.log(val)
					if(index==0)
					 path+="M"+val//path.concat("M"+val)
					else if(index>0)
						path+="L"+val
				});
				//path+="Z"
				//console.log(path)
				var newLine = paper.path(path)
				.attr({
					fill:"rgba(0,0,0,.6)"
				})
				.data('objectName',opt.objectName)
				.setCustomAttributes()
				//.transform("s5")
		}

		function crearForma() {
			crearPtos(function(opt){
				crearRaya({
					points:opt.arrayPtos,
					objectName:"objAmorfo"
				})
				opt.setPtos.remove()
			})
		}

		function crearPtos(callback) {
			var callback = callback || function(){}
			var set = paper.set();

			$svg_.css({
				cursor:"crosshair"
			})
			var arrayPtos = [],iniciar = true;
				$svg_.click(function(event) {
					if(iniciar){
						//	console.log(event.originalEvent)
							var x = event.originalEvent.x, y = event.originalEvent.y,
							ptoAnt = paper.getElementByPoint(x,y),
							ptoNuevo = x+","+y;
							if(ptoAnt&&ptoAnt.data('ruta')&&(ptoAnt.data('ruta')==ruta)){//se cogio un pto repetido

								iniciar = false
								startDefaultStatus()
								var ultimoEleEnSet = set[(set.length)-1],
								primerEleEnSet = set[0];
								arrayPtos.push(ptoNuevo)
								if(ultimoEleEnSet.id==ptoAnt.id)
									arrayPtos.splice(arrayPtos.length - 1,1)

								callback({
									arrayPtos:arrayPtos,
									setPtos:set
								})

								ruta++;
							}else{
								arrayPtos.push(ptoNuevo)
								var newPto = paper.circle(x,y,5)
								//.setCustomAttributes()
								.attr({
									stroke:"transparent",
									fill:"rgba(0,220,6,.7)"
								})
								.data('objectName','objPunto')
								.mouseover(function(){
									this.transform("s1.7")
									this.attr({
										stroke:"rgba(0,0,0,0)"
									})
								})
								.mouseout(function(){
									this.transform("s1")
								})
								.data('ruta',ruta)
								set.push(newPto)
							}
					}
				});
		}
		function startDefaultStatus() {
				$svg_.css({
					cursor:"default"
				})
		}
		function crearTexto (opt) {
			var default_ = {
				texto : "{ }",
				x:20,
				y:20
			}
			opt = $.extend(default_,opt)
			var newText = paper.text(opt.x,opt.y,opt.texto)
			.setCustomAttributes()
		}
		function crearCirculo(opt) {
				var default_ = {
					x : 0,//posicion en el eje x
					y : 0,//posicion en el eje y
					r: 5,//anchura
					color:"rgba(0,0,0,0)"//color de fondo
				}
				opt = $.extend(default_,opt)
				var newCirculo = paper.circle(opt.x,opt.y,opt.r)
				.setCustomAttributes()
		}

		function eliminarElemento (){
			//console.log("removiendo...")
			actual.remove()
		}
		$btnCambiarTexto.click(function(event) {
			actual.attr({
				text:$parrafo.val()
			})
		});
		$btnCrearTexto.click(function(event) {
			var texto = $parrafo.val();
			crearTexto({
				texto:texto
			})
		});

		$btnCrearRaya.click(function(event) {
			crearRaya({
			})
		});
		$btnCrearCircle.click(function(event) {
			crearCirculo({
				x:0,
				y:0,
				r:10
			})
		});
		$btnCrearRect.click(function(event) {
			var ancho = parseInt($('.ancho').val()),
			alto = parseInt($('.alto').val()),
			color = $('.color').val();
			var opt = {
				container:paper,
				width:ancho,
				height:alto,
				color:"rgba(0,0,0,0)"
			}

			crearRectangulo(opt)
		});

		$btnCrearForma.click(function(event) {
			crearForma()
		});
		$eliminar.click(function(event) {
			eliminarElemento()
		});
		$btnCrearPtos.click(function(event) {
			crearPtos()
		});
		function transformar() {
   var datos = actual.getBBox(false);
   //console.log(datos.x +" : "+datos.y+ ", deg:"+actual._['deg'])
   var Xdes = 0, Ydes = 0;
			var deegre = $rotate.val(),
			x = parseInt($translatex.val()),
			y = parseInt($translatey.val()),
			scale = 1+(parseInt($escala.val())/10);
   if(actual.data('objectName')&&(actual.data('objectName')=="objAmorfo")){
	   Xdes = actual._['bbox']['cx']
	   Ydes = actual._['bbox']['cy']
	   //console.log("coords: "+Xdes+" , "+Ydes)
				//actual.transform("t"+(Xdes)+","+(Ydes)+"r"+deegre+"s"+scale)			
				actual.transform("t"+x+","+y+"r"+deegre+"s"+scale)			
   }else{
				actual.transform("t"+(x - Xdes)+","+(y - Ydes)+"r"+deegre+"s"+scale)			
   }
		}

		$rotate.change(function(event) {
			transformar()
		});

		$translatex.change(function(event) {
			transformar()
		});

		$translatey.change(function(event) {
			transformar()
		});

		$escala.change(function(event) {

		transformar()

		});

		$alto.change(function(event) {
			actual.attr({
				height:$alto.val()
			})
		});


		$ancho.change(function(event) {
			actual.attr({
				width:$ancho.val()
			})
		});
