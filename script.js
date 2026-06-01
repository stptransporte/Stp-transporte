const stepButtons = document.querySelectorAll(".step-button");
const screens = document.querySelectorAll(".screen");

function showScreen(screenName) {
  stepButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screenName);
  });

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screenPanel === screenName);
  });
}

stepButtons.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.screen));
});
