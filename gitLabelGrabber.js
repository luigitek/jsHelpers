var labels = [];
[].slice.call(document.querySelectorAll(".js-label-link"))
.forEach(function(element) {
  labels.push({
    name: element.textContent.trim(),
    description: element.getAttribute("title"),
    // using style.backgroundColor might returns "rgb(...)"
    color: element.getAttribute("style")
      .replace("background-color:", "")
      .replace(/color:.*/,"")
      .trim()
      // github wants hex code only without # or ;
      .replace(/^#/, "")
      .replace(/;$/, "")
      .trim(),
  })
})

function saveJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, undefined, 4)], { type: 'text/json' });
  const e = document.createEvent('MouseEvents');
  const a = document.createElement('a');

  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
}

//console.log(JSON.stringify(labels, null, 2))
saveJSON(labels, 'labels.json')
