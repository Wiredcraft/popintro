const POPINTRO_URL = 'https://wiredcraft.com/popintro';

const POPINTRO_HTML = '';
      POPINTRO_HTML += '  <div id="popintro-wrapper">';
      POPINTRO_HTML += '    <video id="popintro-video" autoplay muted loop="true">';
      POPINTRO_HTML += '      <source src="'+ POPINTRO_VIDEO +'" type="video/mp4"/>';
      POPINTRO_HTML += '    </video>';
      POPINTRO_HTML += '    <div id="popintro-mask">';
      POPINTRO_HTML += '      <div id="popintro-message"><img src="'+ POPINTRO_URL +'/popintro/sound-off.svg"><span>Click to unmute</span></div>';
      POPINTRO_HTML += '    </div>';
      POPINTRO_HTML += '    <div id="popintro-close"><img src="'+ POPINTRO_URL +'/popintro/close.svg"></div>';
      POPINTRO_HTML += '    <div id="popintro-action">';
      POPINTRO_HTML += POPINTRO_ACTION;
      POPINTRO_HTML += '    </div>';
      POPINTRO_HTML += '  </div>';

// Inject the container
var popintro = {};
popintro.container = document.createElement('div');
popintro.container.setAttribute('id', 'popintro-container');
document.body.appendChild(popintro.container);
popintro.container.innerHTML = popintroHTML;

// Intialize
popintro.video = document.getElementById('popintro-video');
popintro.mask = document.getElementById('popintro-mask');
popintro.message = document.getElementById('popintro-message');
popintro.close = document.getElementById('popintro-close');
popintro.status = 'default';

//
popintro.setStatus = function (status) {
  popintro.status = status;
  popintro.container.className = 'popintro-status-'+ status;
  switch(popintro.status) {
    case 'default':
    case 'muted':
      popintro.message.innerHTML = '<img src="'+ POPINTRO_URL +'/popintro/sound-off.svg"><span>Click to unmute</span>';
      break;
    case 'stopped':
      popintro.message.innerHTML = '<img src="'+ POPINTRO_URL +'/popintro/replay.svg"><span>Click to replay</span>';
      break;
    case 'closed':
      popintro.message.innerHTML = '<img src="'+ POPINTRO_URL +'/popintro/play.svg">';
      break;
    default:
      popintro.message.innerHTML = '<img src="'+ POPINTRO_URL +'/popintro/sound-on.svg">';
      break;
  }
};

popintro.close.onclick = function (e) {
  popintro.video.pause();
  popintro.setStatus('closed');
};

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

popintro.video.addEventListener(
  'ended',
  function myHandler(e) {
    popintro.setStatus('stopped');
  },
  false
);
