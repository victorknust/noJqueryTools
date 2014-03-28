function fadeIn(el) {
  el.style.display = '';
  el.style.opacity = 0;
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  };
  tick();
}
function fadeOut(el) {
  el.style.display = '';
  el.style.opacity = 1;
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
    else{
      el.style.display = 'none';
    }
  };
  tick();
}

function addClass(el,className){
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}
function removeClass(el,className){
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}
function toggleClass(el,className){
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    el.className = classes.join(' ');
  }
}

function hasClass(el,className){
  if (el.classList)
    el.classList.contains(className);
  else
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
function hasClass(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};
function each(el, callback){
  var el = document.querySelectorAll(selector);
  Array.prototype.forEach.call(el, callback);
}
function css(el,attr){
  for(var properties in attr){
    el.style.+properties = attr[properties];
  }
}


function ajax(settings) {
  var dataType = settings.dataType || 'json',
  type = settings.type || 'get';

  var req = new XMLHttpRequest();
  req.open(type, settings.url, true);
  req.responseType = dataType;
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
      if(req.status == 200){
        if(settings.success)
          settings.success(req.response, req.status, req.statusText);
      }
      else{
        if(settings.error)
          settings.error(req.response, req.status, req.statusText);
      }
      if(settings.complete)
        settings.complete(req.response, req.status, req.statusText);
    }
  };
  req.send(null);
}
