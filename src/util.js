Date.prototype.getFormatTime = function() {
  let date = this.toLocaleDateString().split('/').map(item => {
    if(item.length < 2) {
      item = '0' + item;
    }
    return item;
  }).join('-');
  let time = this.toTimeString().split(' ')[0];
  return date + ' ' + time;
}