// Referencias a los elementos
const commentForm = document.getElementById("commentForm");
const usernameInput = document.getElementById("username");
const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");

// Referencia a la base de datos de Firebase
const database = firebase.database();
const commentsRef = database.ref("comments");

// Evento para manejar el envío del formulario
commentForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar recargar la página

  const username = usernameInput.value.trim();
  const comment = commentInput.value.trim();

  if (username && comment) {
    // Enviar el comentario a Firebase
    commentsRef.push({
      username,
      message: comment,
      timestamp: new Date().toISOString(),
    });

    // Limpiar los campos
    usernameInput.value = "";
    commentInput.value = "";
  } else {
    alert("Por favor, ingresa tu nombre y comentario.");
  }
});

// Escuchar nuevos comentarios y actualizarlos en la interfaz
commentsRef.on("child_added", (snapshot) => {
  const { username, message } = snapshot.val();
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  commentDiv.innerHTML = `
    <strong>${username}</strong>
    <p>${message}</p>
  `;

  // Agregar el comentario al listado
  commentList.appendChild(commentDiv);
});
