let elText = document.querySelector("p");
document.querySelector("button").addEventListener("click", () => {
    elText.textContent = elText.textContent.replace(/\B'|'\B/g, '"');
    elText.textContent = elText.textContent.replace(/\bOne/g, "<br>One");
    elText.textContent = elText.textContent.replace(/\bTwo/g, "<br>Two");
    elText.remove();
    document
        .querySelector("div")
        .insertAdjacentHTML("beforebegin", `<p>${elText.textContent}</p>`);
});