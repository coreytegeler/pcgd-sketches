$(function() {
	wrap();
	$('.link').click(function() {
		if(!$(this).hasClass('selected')) {
			var speed = 500;
			var scale = 3;
			var linkW = $(this).width();
			var linkH = $(this).height();
			var linkX = $(this).offset().left + linkW/2;
			var linkY = $(this).offset().top;

			var newX = winW()/2 - linkX;
			var newY = -linkY + 10;

			$('#manifesto').transition({
				x: newX,
				y: newY
			}, speed);

			$('#front').transition({
				scale: scale
			}, speed);

			$('body').addClass('zoom');

			$(this).addClass('selected');
			var id = $(this)[0].id;
			var padTop = ($(this).height() * scale) + 40;


			$selectedSection = $('section#'+id);
			$selectedSection.css({paddingTop: padTop}).addClass('selected');

			setTimeout(function() {
				$blocks = shuffle($selectedSection.children('.blocks').children('.block'));
				$.each($blocks, function(i, block) {
					setTimeout(function() {
						$blocks.eq(i).addClass('show');	
					}, 30*i);
				});
			}, speed);
		} else {
			$('#manifesto').transition({
				x: 0,
				y: 0
			});

			$('#front').transition({
				scale: 1
			}, 500);

			$('body').removeClass('zoom');

			$(this).removeClass('selected');
			$('section.selected').removeClass('selected');
		}
	});

	$(window).resize(function() {

	});

	function wrap() {
		var manifesto = $('#manifesto p');
		var words = manifesto.text().split(' ');
		manifesto.empty();

		var links = [
			'students',
			'faculty',
			'alumni',
			'apply',
			'community'
		];

		$.each(words, function(i,word) {
			var link = links.indexOf(word);
			if(link != -1) {
				manifesto.append($("<span class='link' id='" + word + "'>"+word+"</span>")).append('\u00A0');
			} else {
				manifesto.append($("<span class='word'>"+word+"</span>")).append('<span> </span>');
			}

			if(i == words.length - 1) {
				typeset();
			}
		});
	}

	function typeset() {
		var t = 0;
		$('.word').click(function(e) {
			if(!$(this).is('.selected')) {
				if(e.shiftKey) {
					$(this).addClass('selected');
				} else {
					$('.word.selected').removeClass('selected');
					$(this).addClass('selected');	
				}
			} else {
				$(this).removeClass('selected');
			} 
		});

		// $('body').click(function(e) {
		// 	console.log(!$(e.target).hasClass('word'));
		// 	if(!$(e.target).hasClass('word')) {
		// 		$('.word.selected').removeClass('selected');
		// 	}
		// });

		$('#fontSelect').change(function(e) {
			var font = e.target.value;
			$('.word.selected').attr('data-font', font)
		});
	}


	$('.tool').draggable({
		start: function() {
			$(this).addClass('dragging');
		},
		stop: function() {
			$(this).removeClass('dragging');
		}
	});


	$('.blocks').imagesLoaded(function() {
		$('.blocks').masonry({
			itemSelector: '.block',
			columnWidth: '.image:last-child',
			gutter: 20,
			isFitWidth: true,
			stamp: '.stamp'
		});
	});
	

	$('.image').hover(function() {
		// var image = $(this).children('img').attr('src');
		// $('#imageViewer').css({'backgroundImage':'url("'+image+'")'});
		// $('#imageViewer').addClass('hover');
	}, function() {
		$('#imageViewer').not('.clicked').css({'backgroundImage':''});
		$('#imageViewer').removeClass('hover');
	});
	
	$('.image').click(function() {
		var image = $(this).children('img').attr('src');
		$('#imageViewer').css({'backgroundImage':'url("'+image+'")'});
		$('#imageViewer').removeClass('hover').addClass('clicked');
	});
});