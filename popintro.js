var popintroHTML = '';
popintroHTML += '  <div id="popintro-wrapper">';
popintroHTML += '    <video id="popintro-video" autoplay muted loop="true">';
popintroHTML += '      <source src="/popintro/hello.m4v" type="video/mp4"/>';
popintroHTML += '    </video>';
popintroHTML += '    <div id="popintro-mask">';
popintroHTML += '      <div id="popintro-message"><img src="/popintro/sound-off.svg"><span>Click to unmute</span></div>';
popintroHTML += '    </div>';
popintroHTML += '    <div id="popintro-close"><img src="/popintro/close.svg"></div>';
popintroHTML += '    <div id="popintro-action">';
popintroHTML += popintroAction;
popintroHTML += '    </div>';
popintroHTML += '  </div>';

var popintro = {};

popintro.container = document.createElement('div');
popintro.container.setAttribute('id', 'popintro-container');
document.body.appendChild(popintro.container);
popintro.container.innerHTML = popintroHTML;

popintro.video = document.getElementById('popintro-video');
popintro.mask = document.getElementById('popintro-mask');
popintro.message = document.getElementById('popintro-message');
popintro.close = document.getElementById('popintro-close');
popintro.status = 'default';

popintro.setStatus = function (status) {
  popintro.status = status;
  popintro.container.className = 'popintro-status-'+ status;
  switch(popintro.status) {
    case 'default':
    case 'muted':
      popintro.message.innerHTML = '<img src="/popintro/sound-off.svg"><span>Click to unmute</span>';
      break;
    case 'stopped':
      popintro.message.innerHTML = '<img src="/popintro/replay.svg"><span>Click to replay</span>';
      break;
    case 'closed':
      popintro.message.innerHTML = '<img src="/popintro/play.svg">';
      break;
    default:
      popintro.message.innerHTML = '<img src="/popintro/sound-on.svg">';
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
