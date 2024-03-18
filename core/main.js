export function createLouder(){
  $("#root").append($("<div>", {
    class: "loader-container"
  }).append($("<div>", {
    class: "loader",
  })));
}

export function destroyLouder(){
  $(".loader-container").addClass("hideItem");

  setTimeout(() => {
    $(".loader-container").remove();
  }, 500);
}

export function alert1(mensaje, icon){
  let alertContainer = $("<div>", {
    class: "alert-container"
  });

  let alert = $("<div>", {
    class: "alert",
  });

  let img = $("<img>", {
    src: `assets/images/${icon}`,
    alt: mensaje,
    class: "icon-alert",
  });

  let mensajeAlert = $("<p>", {
    class: "mensaje-alert",
    text: mensaje,
  });

  let button = $("<button>", {
    class: "button-alert",
    text: "Cerrar",
  });

  alert.append(img);
  alert.append(mensajeAlert);
  alert.append(button);
  alertContainer.append(alert);

  button.on("click", function(){
    $(this).parents(".alert-container").addClass("hideItem");

    setTimeout(() => {
      $(this).parents(".alert-container").remove();
    }, 500);
  });

  $("#root").append(alertContainer);
}
