const courses = [
  {
    id: "inclusion",
    code: "INC",
    title: "Inclusion y trato respetuoso",
    description:
      "Principios de atencion inclusiva, lenguaje adecuado y eliminacion de prejuicios durante el servicio.",
    duration: "40 min",
    lessons: 5,
    status: "Completado",
    progress: 100,
    activities: [
      ["Bienvenida y objetivo del curso", "Completada"],
      ["Lenguaje respetuoso con pasajeros", "Completada"],
      ["Identificacion de barreras de acceso", "Completada"],
      ["Caso practico guiado", "Completada"],
      ["Evaluacion del modulo", "Completada"],
    ],
  },
  {
    id: "espacios",
    code: "ACC",
    title: "Uso de espacios reservados",
    description:
      "Como resguardar asientos preferentes, zonas para sillas de ruedas y espacios de circulacion segura.",
    duration: "35 min",
    lessons: 4,
    status: "En progreso",
    progress: 75,
    activities: [
      ["Reconocer espacios prioritarios", "Completada"],
      ["Normativa basica y responsabilidades", "Completada"],
      ["Buenas practicas dentro del bus", "En progreso"],
      ["Evaluacion del modulo", "Pendiente"],
    ],
  },
  {
    id: "situaciones",
    code: "RTA",
    title: "Situaciones reales en ruta",
    description:
      "Decision profesional ante conflictos, apoyo a personas mayores y coordinacion segura con pasajeros.",
    duration: "45 min",
    lessons: 6,
    status: "Disponible",
    progress: 20,
    activities: [
      ["Identificar necesidades urgentes", "Completada"],
      ["Resolver conflictos con calma", "Pendiente"],
      ["Pedir colaboracion a pasajeros", "Pendiente"],
      ["Simulacion de caso en ruta", "Pendiente"],
      ["Retroalimentacion del instructor", "Pendiente"],
      ["Evaluacion del modulo", "Pendiente"],
    ],
  },
  {
    id: "comunicacion",
    code: "COM",
    title: "Comunicacion clara y segura",
    description:
      "Frases breves, indicaciones simples y comunicacion profesional para apoyar a distintos pasajeros.",
    duration: "30 min",
    lessons: 4,
    status: "Disponible",
    progress: 0,
    activities: [
      ["Indicaciones claras al subir", "Pendiente"],
      ["Apoyo a personas con discapacidad", "Pendiente"],
      ["Comunicacion en incidentes", "Pendiente"],
      ["Evaluacion del modulo", "Pendiente"],
    ],
  },
];

const courseGrid = document.querySelector("#courseGrid");
const selectedTitle = document.querySelector("#selectedTitle");
const selectedDescription = document.querySelector("#selectedDescription");
const selectedDuration = document.querySelector("#selectedDuration");
const selectedLessons = document.querySelector("#selectedLessons");
const selectedProgress = document.querySelector("#selectedProgress");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const activityList = document.querySelector("#activityList");
const simFeedback = document.querySelector("#simFeedback");
const examFeedback = document.querySelector("#examFeedback");
const certificateStatus = document.querySelector("#certificateStatus");

function statusClass(value) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function renderCourses(activeId = "espacios") {
  courseGrid.innerHTML = courses
    .map(
      (course) => `
        <button class="course-tile ${course.id === activeId ? "active" : ""}" type="button" data-course="${course.id}">
          <span class="course-icon">${course.code}</span>
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <span class="course-meta">
            <span>${course.duration}</span>
            <span>${course.lessons} lecciones</span>
          </span>
          <span class="status ${statusClass(course.status)}">${course.status}</span>
          <span class="open-course">Abrir curso</span>
        </button>
      `,
    )
    .join("");

  document.querySelectorAll("[data-course]").forEach((button) => {
    button.addEventListener("click", () => selectCourse(button.dataset.course, true));
  });
}

function renderActivities(course) {
  activityList.innerHTML = course.activities
    .map(([name, status], index) => {
      const className = statusClass(status);
      return `
        <button class="activity-row ${className}" type="button">
          <span>${index + 1}. ${name}</span>
          <strong>${status}</strong>
        </button>
      `;
    })
    .join("");
}

function selectCourse(courseId, shouldScroll = false) {
  const course = courses.find((item) => item.id === courseId) || courses[1];

  selectedTitle.textContent = course.title;
  selectedDescription.textContent = course.description;
  selectedDuration.textContent = course.duration;
  selectedLessons.textContent = course.lessons;
  selectedProgress.textContent = `${course.progress}%`;
  progressText.textContent = `${course.progress}%`;
  progressBar.style.width = `${course.progress}%`;

  renderCourses(course.id);
  renderActivities(course);

  if (shouldScroll) {
    document.querySelector("#contenido").scrollIntoView({ behavior: "smooth" });
  }
}

document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#cursos").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#recoverButton").addEventListener("click", () => {
  document.querySelector("#recoverMessage").textContent =
    "Listo: se muestra mensaje de envio de instrucciones al correo registrado.";
});

document.querySelector("#continueButton").addEventListener("click", () => {
  document.querySelector("#evaluacion").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll("[data-sim]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-sim]").forEach((item) => {
      item.classList.remove("correct", "partial", "wrong");
    });

    const value = button.dataset.sim;
    button.classList.add(value);

    if (value === "right") {
      simFeedback.textContent =
        "Correcto: el conductor interviene con respeto, promueve colaboracion y cuida el espacio preferente.";
      return;
    }

    if (value === "partial") {
      simFeedback.textContent =
        "Parcial: esperar puede ayudar, pero el conductor debe guiar la situacion de forma profesional.";
      return;
    }

    simFeedback.textContent =
      "Incorrecto: no intervenir puede afectar la seguridad y accesibilidad del pasajero.";
  });
});

document.querySelectorAll("[data-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-answer]").forEach((item) => {
      item.classList.remove("correct", "wrong");
    });

    const isRight = button.dataset.answer === "right";
    button.classList.add(isRight ? "correct" : "wrong");
    examFeedback.textContent = isRight
      ? "Respuesta correcta. Evaluacion aprobada."
      : "Respuesta incorrecta. La prioridad es seguridad, respeto y apoyo oportuno.";
    certificateStatus.textContent = isRight ? "Aprobado - listo para generar" : "Pendiente de aprobacion";
  });
});

document.querySelector("#certificateButton").addEventListener("click", () => {
  certificateStatus.textContent = "Certificado demo generado para conductor STP";
  alert("Certificado demo generado.");
});

selectCourse("espacios");
