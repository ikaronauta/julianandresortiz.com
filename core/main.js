export function createLouder() {
  $("#root").append(
    $("<div>", {
      class: "loader-container",
    }).append(
      $("<div>", {
        class: "loader",
      })
    )
  );
}

export function destroyLouder() {
  $(".loader-container").addClass("hideItem");

  setTimeout(() => {
    $(".loader-container").remove();
  }, 500);
}

export function alert1(mensaje, icon) {
  let alertContainer = $("<div>", {
    class: "alert-container",
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

  button.on("click", function () {
    $(this).parents(".alert-container").addClass("hideItem");

    setTimeout(() => {
      $(this).parents(".alert-container").remove();
    }, 500);
  });

  $("#root").append(alertContainer);
}

export function createForm(idForm) {
  let form = $("<form>", {
    id: idForm, //form-concact
    class: "form",
  });

  let labelName = $("<label>", {
    class: "label-form",
    text: "Nombre",
    for: "name",
  });

  let inputName = $("<input>", {
    id: "name",
    type: "text",
    name: "user_name",
    class: "input-form",
    placeholder: "Nombre",
  });

  let section1 = $("<div>", {
    class: "section-form",
  });

  section1.append(labelName);
  section1.append(inputName);

  let labelEmail = $("<label>", {
    class: "label-form",
    text: "Email *",
    for: "email",
  });

  let inputEmail = $("<input>", {
    id: "email",
    type: "email",
    name: "user_email",
    class: "input-form",
    placeholder: "Email",
    required: true,
  });

  let section2 = $("<div>", {
    class: "section-form",
  });

  section2.append(labelEmail);
  section2.append(inputEmail);

  let labelMensaje = $("<label>", {
    class: "label-form",
    text: "Mensaje *",
    for: "mensaje",
  });

  let textareaMensaje = $("<textarea>", {
    id: "mensaje",
    name: "message",
    class: "textarea-form",
    placeholder: "Mensaje",
    required: true,
  });

  let section3 = $("<div>", {
    class: "section-form",
  });

  section3.append(labelMensaje);
  section3.append(textareaMensaje);

  let button = $("<button>", {
    type: "submit",
    class: "button-form",
    text: "Enviar",
  });

  let section4 = $("<div>", {
    class: "section-form",
  });

  section4.append(button);

  form.append(section1);
  form.append(section2);
  form.append(section3);
  form.append(section4);

  return form;
}
