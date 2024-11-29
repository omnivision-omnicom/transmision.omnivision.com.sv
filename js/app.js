import { database } from '../js/firebaseConfig.js';
import { ref, push, onValue, update } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';

const commentsRef = ref(database, 'comments');

// Inicializa el listener para cargar comentarios
function initCommentsListener() {
  onValue(commentsRef, (snapshot) => {
    const commentList = document.getElementById("commentList");
    commentList.innerHTML = ""; // Limpia el DOM para evitar duplicados

    if (snapshot.exists()) {
      const comments = snapshot.val();
      Object.entries(comments).forEach(([key, comment]) => {
        renderComment(comment.username, comment.message);
      });
    } else {
      console.log("No hay comentarios disponibles.");
    }
  }, (error) => {
    console.error("Error al cargar comentarios:", error);
  });
}

// Función para renderizar un comentario en el DOM
function renderComment(username, message) {
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("border", "p-2", "mb-2", "rounded");
  commentDiv.innerHTML = `<strong>${username}:</strong> <span>${message}</span>`;
  document.getElementById("commentList").appendChild(commentDiv);
}

// Manejo del formulario de comentarios
document.getElementById("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const comment = document.getElementById("commentInput").value.trim();

  if (username && comment) {
    const newCommentRef = push(commentsRef);
    update(newCommentRef, {
      username,
      message: comment,
      timestamp: new Date().toISOString(),
    });

    // Limpia el formulario
    document.getElementById("username").value = "";
    document.getElementById("commentInput").value = "";
  } else {
    alert("Por favor, ingresa tu nombre y comentario.");
  }
});

// Inicia el listener al cargar la página
initCommentsListener();
