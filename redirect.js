(function () {
  function redirectSearch(search) {
    const href =
      [
        "https://www.google.com/search?q=",
        "https://www.bing.com/search?q=",
        "https://www.baidu.com/s?wd=",
      ][0] +
      "site%3A" +
      location.hostname +
      "+" +
      search.replace(/.*[\?&]q=/, "");
    // window.open(href, "_blank");
    location.href = href;
  }
  const _pushState = history.pushState;
  const _replaceState = history.replaceState;
  history.pushState = function (o, a, u) {
    if (/\?q=/.test(u)) {
      return redirectSearch(u);
    }
    _pushState.call(history, o, a, u);
  };
  history.replaceState = function (o, a, u) {
    if (/\?q=/.test(u)) {
      return redirectSearch(u);
    }
    _replaceState.call(history, o, a, u);
  };
  if (/[\?&]q=/.test(location.search)) {
    redirectSearch(location.search);
  }
})();
