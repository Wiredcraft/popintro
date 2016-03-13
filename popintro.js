// Widget template
var POPINTRO_HTML = '';
    POPINTRO_HTML += '  <div id="popintro-wrapper">';
    POPINTRO_HTML += '    <video id="popintro-video" autoplay muted loop="true">';
    POPINTRO_HTML += '      <source id="popintro-video-source" type="video/mp4"/>';
    POPINTRO_HTML += '    </video>';
    POPINTRO_HTML += '    <div id="popintro-mask">';
    POPINTRO_HTML += '      <div id="popintro-message"><img src="'+ POPINTRO_URL +'/images/sound-off.svg"><span>Click to unmute</span></div>';
    POPINTRO_HTML += '    </div>';
    POPINTRO_HTML += '    <div id="popintro-close"><img src="'+ POPINTRO_URL +'/images/close.svg"></div>';
    POPINTRO_HTML += '    <div id="popintro-action"></div>';
    POPINTRO_HTML += '  </div>';

// Defines which step from POPINTRO_STEPS
var POPINTRO_STEP = 0;

// Inject the container
var popintro = {};
popintro.container = document.createElement('div');
popintro.container.setAttribute('id', 'popintro-container');
document.body.appendChild(popintro.container);
popintro.container.innerHTML = POPINTRO_HTML;
popintro.wrapper = document.getElementById('popintro-wrapper');
popintro.video = document.getElementById('popintro-video');
popintro.source = document.getElementById('popintro-video-source');
popintro.mask = document.getElementById('popintro-mask');
popintro.message = document.getElementById('popintro-message');
popintro.close = document.getElementById('popintro-close');
popintro.action = document.getElementById('popintro-action');
popintro.status = '';
popintro.nextButton = document.createElement('button');
popintro.nextButton.className = 'popintro-next';
popintro.nextButton.innerHTML = 'Next';

// Track status of the widget
popintro.setStatus = function (status) {
  popintro.status = status;
  popintro.wrapper.className = 'popintro-status-'+ status;
  switch(popintro.status) {
    case 'default':
    case 'muted':
      popintro.message.innerHTML = '<img src="'+ POPINTRO_URL +'/images/sound-off.svg"><span>Click to unmute</span>';
      break;
    case 'stopped':
      popintro.message.innerHTML = '<img src="'+ POPINTRO_URL +'/images/replay.svg"><span>Click to replay</span>';
      break;
    case 'closed':
      popintro.message.innerHTML = '<img src="'+ POPINTRO_URL +'/images/play.svg">';
      break;
    default:
      popintro.message.innerHTML = '<img src="'+ POPINTRO_URL +'/images/sound-on.svg">';
      break;
  }
};

// Initialize
popintro.init = function () {
  var step = POPINTRO_STEPS[POPINTRO_STEP];
  popintro.source.setAttribute('src', step.video);
  popintro.video.load();
  popintro.video.muted = true;
  popintro.video.loop = true;
  popintro.setStatus('default');
  if (typeof step.position == 'undefined') {
    step.position = 'bottom-right';
  }
  popintro.container.className = 'popintro-'+ step.position;
  if (typeof step.action !== 'undefined') {
    popintro.action.innerHTML = step.action;
  }
  else {
    popintro.action.appendChild(popintro.nextButton);
  }
}

popintro.init();

// Close button
popintro.close.onclick = function (e) {
  popintro.video.pause();
  popintro.setStatus('closed');
};

popintro.nextButton.onclick = function (e) {
  POPINTRO_STEP++;
  popintro.init();
}

// Play/Mute/Replay
popintro.mask.onclick = function (e) {
  switch(popintro.status) {
    case 'playing':
      popintro.video.muted = true;
      popintro.setStatus('muted');
      break;
    default:
      popintro.video.load();
      popintro.video.muted = false;
      popintro.video.loop = false;
      popintro.setStatus('playing');
      break;
  }
};

// Track when video ends with sound
popintro.video.addEventListener(
  'ended',
  function myHandler(e) {
    popintro.setStatus('stopped');
  },
  false
);
