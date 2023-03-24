const DivtoSpan = (element: any) => {
  element.style.overflow = "hidden";
  element.innerHTML = element.innerText
    .split("")
    .map((char: any) => {
      if (char === " ") {
        return `<span>${char}</span>`;
      }

      return `<span class="animated animated-${element.className}">${char}</span>`;
    })
    .join("");

  return element;
};

export default DivtoSpan;
