var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
		playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
var vid = [
			{'videoId': '9ZfN87gSjvI', 'startSeconds': 18, 'endSeconds': 240, 'suggestedQuality': 'hd1080'},
			{'videoId': 'AK-MUzWdpjU', 'startSeconds': 0, 'endSeconds': 162, 'suggestedQuality': 'hd1080'},
			{'videoId': 'f-9ijiN31LI', 'startSeconds': 0, 'endSeconds': 342, 'suggestedQuality': 'hd1080'},
			{'videoId': 'tdwbYGe8pv8', 'startSeconds': 19, 'endSeconds': 694, 'suggestedQuality': 'hd1080'},
			{'videoId': 'i_twPLPQq_s', 'startSeconds': 0, 'endSeconds': 124, 'suggestedQuality': '480'}
		],
		randomVid = Math.floor(Math.random() * vid.length),
    currVid = randomVid;



function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  tv.loadVideoById(vid[currVid]);
}

function onPlayerStateChange(e) {
  if (e.data === 1){
    $('#tv').addClass('active');
    $('.hi em:nth-of-type(2)').html(currVid + 1);
  } else if (e.data === 2){
    $('#tv').removeClass('active');
    if(currVid === vid.length - 1){
      currVid = 0;
    } else {
      currVid++;  
    }
    tv.loadVideoById(vid[currVid]);
    tv.seekTo(vid[currVid].startSeconds);
  }
}

function vidRescale(){

  var w = $(window).width()+200,
    h = $(window).height()+200;

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

$(window).on('load resize', function(){
  vidRescale();
});

