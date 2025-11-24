const texts = [
  { title: "1. ENO ARNIASIH", content: ["085107884777", "061079"] },
  { title: "2. DEWI", content: ["dewialok83@gmail.com", "223789"] },
  { title: "3. FIRMANSYAH", content: ["085367772283", "131993"] },
  { title: "4. LIM LIE KIAN", content: ["limliekian87@gmail.com", "778899"] },
  { title: "5. ATIK", content: ["085269526422", "411369"] },
  { title: "6. DERI RESTA ALAM", content: ["Andykennard12@gmail.com", "778899"] },
  { title: "7. KARTINI", content: ["ekoplg40@gmail.com", "123456"] },
  { title: "8. SOEKARDI JAUHARI", content: ["soekardijauhari234@gmail.com", "120012"] },
  { title: "9. DODY SETYANATA", content: ["dodywang1688@gmail.com", "116688"] }
];

const listContainer = document.getElementById('text-list');

texts.forEach((item, index) => {
  // Insert SEMENTARA before teks ke-5
  if (index === 4) {
    const sec = document.createElement("h2");
    sec.className = "section";
    sec.innerText = "SEMENTARA";
    listContainer.appendChild(sec);
  }

  const container = document.createElement("div");
  container.className = "text-item";

  const title = document.createElement("h3");
  title.innerText = item.title;
  container.appendChild(title);

  item.content.forEach(text => {
    const row = document.createElement("div");
    row.className = "row";

    const p = document.createElement("p");
    p.innerText = text;

    const btn = document.createElement("button");
    btn.innerText = "Salin";
    btn.className = "copy-btn";

    const msg = document.createElement("span");
    msg.className = "msg";

   btn.onclick = () => {
  navigator.clipboard.writeText(text)
    .then(() => {
      msg.classList.remove("show"); // reset animasi
      void msg.offsetWidth;          // trigger reflow
      msg.classList.add("show");    // tampilkan animasi
    })
    .catch(() => {
      msg.innerText = "Gagal salin";
      setTimeout(() => { msg.innerText = ""; }, 1600);
    });
};

    row.appendChild(p);
    row.appendChild(btn);
    row.appendChild(msg);

    container.appendChild(row);
  });

  listContainer.appendChild(container);
});

