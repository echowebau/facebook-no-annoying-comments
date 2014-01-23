chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------


		var echoweb_hidden_comments = 0;
		var $container = jQuery('body');//jQuery('.UFIContainer');
				
		function hideAllAnnoyingComments() {
			// console.log('Trying to hide annoying comments');
			// console.log(jQuery('.UFIComment').not('.echoweb-checked'));
			jQuery('.UFIComment').not('.echoweb-checked').each(function(index,element){
				$comment = jQuery(this);
				$comment_author = $comment.find('.UFICommentActorName').html();
				hiding = false;
				$comment.addClass('echoweb-checked');
				if ( jQuery(this).find('.profileLink').not(':contains(http),:contains(.com)').length ) {
					var $profileLink = jQuery(this);
					if ( ! jQuery.trim(jQuery(this).find('.profileLink').parent().find('span').text()).length ) {
						hiding = true;
					} else {
						// console.log( 'Text is "' + jQuery.trim( $comment.find('.UFICommentContent > span').text() ).toLowerCase() + '"' );
						//console.log('Not hiding comment from ' + $comment_author); 	
					}
				} else {
					//console.log( 'Comment from ' + $comment_author + ' has not got a tagged comment' );
				}
				if ( jQuery.trim( $comment.find('.UFICommentContent > span').text() ).toLowerCase().replace(/\W/g, '') == 'amen' ) {
					hiding = true;
				}
				if ( hiding ) {
					$comment.addClass('echoweb-hide');
					// console.log('Hiding comment from ' + $comment_author);
					echoweb_hidden_comments++;
				}
			});
		}
		
		function addShowCommentsButton() {
			hideAnnoyingComments();
			jQuery('.UFILastComponent').not('.echoweb-added-show-comments').each(function() {
				if ( $(this).parent('.UFIList').first().has('.echoweb-hide, .echoweb-hide-off') 
				&& !$(this).parent('.UFIReplyList').length ) {
					$(this).after('<li class="UFIRow"><a class="ShowHiddenComments UFICommentLink" href="#" role="button">Show annoying comments</a></li>');
					$(this).addClass('echoweb-added-show-comments');
				}
				
			});
		}
		
		function hideAnnoyingComments() {
			console.log('hideAnnoyingComments()');
			jQuery('.echoweb-hide-off').addClass('echoweb-hide').removeClass('echoweb-hide-off');
		}
		
		function showAnnoyingComments() {
			console.log('showAnnoyingComments()');
			jQuery('.echoweb-hide').addClass('echoweb-hide-off').removeClass('echoweb-hide');
		}
			
		
		$container.on('click','.ShowHiddenComments',function() {
			if ( $(this).attr('data-showing') && ( $(this).attr('data-showing') == '1' ) ) {
				$(this).attr('data-showing', '0' );
				hideAnnoyingComments();
				$(this).html('Show annoying comments');
			} else {
				$(this).attr('data-showing', '1' );
				showAnnoyingComments();
				$(this).html('Hide annoying comments');
			}
		});
	
		/*$container.on('click','.echoweb-hide',function(){
			jQuery(this).addClass('echoweb-hide-off').removeClass('echoweb-hide');
		});
				
		$container.on('click','.echoweb-hide-off',function(){
			jQuery(this).addClass('echoweb-hide').removeClass('echoweb-hide-off');
		});*/
		
		$container.on('mouseover','.echoweb-hide',function(){
			jQuery(this).addClass('echoweb-hide-off').addClass('echoweb-hide-hovered').removeClass('echoweb-hide');
		});
		$container.on('mouseleave','.echoweb-hide-hovered',function(){
			$(this).addClass('echoweb-hide').removeClass('echoweb-hide-hovered').removeClass('echoweb-hide-off');
		});
		
		jQuery('body').on('click','a',function(index,element) {
		//jQuery('body').on('click','.UFIPagerLink, .UFIBlingBox',function(index,element) {
			// console.log('Going to hide new comments');
			setTimeout( function(){hideAllAnnoyingComments();}, 2000 );
		});
		
		hideAllAnnoyingComments();

		addShowCommentsButton();
		
		setInterval( function(){hideAllAnnoyingComments();}, 8000 );


	}
	}, 10);
});