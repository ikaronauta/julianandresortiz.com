export function style(url) {
  return $.get(url, function (data) {
    $("<style>").text(data).appendTo("head");
  });
}
