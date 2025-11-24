import React, { useState } from "react";

export default function TextCollection() {
  const texts = [
    {
      title: "1. ENO ARNIASIH",
      content: [
        "085107884777",
        "061079"
      ]
    },
    {
      title: "2. DEWI",
      content: [
        "dewialok83@gmail.com",
        "223789"
      ]
    },
    {
      title: "3. FIRMANSYAH",
      content: [
        "085367772283",
        "131993"
      ]
    },
    { title: "4. LIM LIE KIAN", content: ["limliekian87@gmail.com", "778899"] },
    { title: "5. ATIK", content: ["085269526422", "411369"] },
    { title: "6. DERI RESTA ALAM", content: ["Andykennard12@gmail.com", "778899"] },
    { title: "7. KARTINI", content: ["ekoplg40@gmail.com", "123456"] },
    { title: "8. SOEKARDI JAUHARI", content: ["soekardijauhari234@gmail.com", "120012"] },
    { title: "9. DODY SETYANATA", content: ["dodywang1688@gmail.com", "116688"] }
  ];

  // copyStatus holds temporary feedback per item-subindex in form "index-subindex" => message
  const [copyStatus, setCopyStatus] = useState({});

  const setStatus = (key, message = "Disalin!") => {
    setCopyStatus((s) => ({ ...s, [key]: message }));
    setTimeout(() => {
      setCopyStatus((s) => {
        const next = { ...s };
        delete next[key];
        return next;
      });
    }, 1600);
  };

  // Robust copy function: try Clipboard API, fall back to hidden textarea + execCommand
  const copyText = async (value, key) => {
    if (!value) return;

    // Try modern Clipboard API first
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
        setStatus(key);
        return;
      }
    } catch (err) {
      // fallthrough to fallback method
    }

    // Fallback: use hidden textarea + document.execCommand('copy')
    try {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      // Prevent scrolling to bottom
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.width = "1px";
      textarea.style.height = "1px";
      textarea.style.padding = "0";
      textarea.style.border = "none";
      textarea.style.outline = "none";
      textarea.style.boxShadow = "none";
      textarea.style.background = "transparent";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (successful) {
        setStatus(key);
      } else {
        // As last resort, show the text so user can copy manually
        setStatus(key, "Gagal menyalin — salin manual");
      }
    } catch (err) {
      // If everything fails, inform the user
      setStatus(key, "Gagal menyalin — salin manual");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-6">
      <div className="max-w-3xl mx-auto">
        {/* WEBSITE HEADER replaced with image, left aligned */}
        <div className="flex flex-col items-start gap-3 mb-6 text-left">
          <img
            src="https://i.imgur.com/q0S9R5g.jpeg"
            alt="Header Image"
            className="w-[260px] h-[80px] rounded-lg object-contain"
          />
          <p className="text-sm text-slate-700 max-w-md">
            Sistem informasi validasi merchant LPG subsidi untuk akses dashboard MyPertamina.
          </p>

          <a
            href="https://subsiditepatlpg.mypertamina.id/merchant-login"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-2 bg-[#6B8E23] text-white text-base font-semibold rounded-xl shadow hover:opacity-90"
          >
            Login
          </a>
        </div>

        {/* TEXT LIST */}
        <div className="grid gap-3">
          {texts.map((item, index) => (
            <React.Fragment key={index}>
              {index === 0 && (
                <h2 className="text-2xl font-bold text-center my-4 max-w-fit mx-auto">UTAMA</h2>
              )}
              {index === 4 && (
                <h2 className="text-2xl font-bold text-center my-6 max-w-fit mx-auto">SEMENTARA</h2>
              )}

              <div className="bg-[#E6E6FA] p-3 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-3">{item.title}</h2>

                {item.content.map((sub, i) => {
                  const key = `${index}-${i}`;
                  return (
                    <div
                      key={key}
                      className="mb-4 border-b pb-3 last:border-none last:pb-0 flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{sub}</p>
                      </div>

                      <div className="flex flex-col items-end">
                        <button
                          onClick={() => copyText(sub, key)}
                          className="mt-2 px-2 py-1 bg-[#6B8E23] text-white text-sm rounded-lg hover:opacity-90"
                          aria-label={`Salin teks ${index + 1} pilihan ${i + 1}`}
                        >
                          Salin
                        </button>

                        {copyStatus[key] && (
                          <div className="mt-2 text-xs text-slate-600">{copyStatus[key]}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          ))}
        </div>

        <p className="text-sm text-slate-700 mt-8 ml-0">Password for Al Farezi</p>
      </div>
    </div>
  );
}
