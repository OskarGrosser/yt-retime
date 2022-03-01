export default function() {
  function formatSeconds(t) {
    const hours = Math.floor(t / 3600);
    const minutes = Math.floor(t / 60) % 60;
    const seconds = Math.floor(t % 60);
    const milli = Math.floor(t * 1000) % 1000;

    return [
      hours ? `${hours}h` : "",
      hours || minutes ? `${minutes}min` : "",
      `${seconds}s`,
      milli ? `${milli}ms` : ""
    ].join(" ").trim();
  }

  // Modify document.head
  const style = document.createElement("style");
  style.innerHTML =
`html {height:100%}
body {
  margin: 0;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: #424549;
}
#player {
  align-self: center;
  margin: 1rem;
  width: auto;
  height: auto;
  aspect-ratio: 16/9;
}
#video-player {
  width: 100% !important;
  height: auto !important;
  top: 0 !important;
  left: 0 !important;
  aspect-ratio: 16/9;
}
.ytp-chrome-bottom {
  width: 100% !important;
  left: 0 !important;
}
.ytp-progress-bar-container,
.ytp-mobile-a11y-hidden-seek-button {display:none}

pre {
  padding: .2rem;
  background-color: #424549;
}

#retimer-wrapper {
  padding: .4rem;
  display: grid;
  gap: .2rem .4rem;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(5, auto) 1fr;
  justify-items: flex-end;
  background-color: #36393e;
}
#retimer-wrapper h1 {justify-self:center}
#retimer-wrapper .fill-row {grid-column:1/-1}
#retimer-wrapper textarea {
  justify-self: stretch;
  resize: vertical;
}`;
  document.head.append(style);

  // Modify document.body
  const fragment = document.createDocumentFragment();

  const wRetimer = document.createElement("div");
  fragment.append(wRetimer);
  wRetimer.setAttribute("id", "retimer-wrapper");

  const heading = document.createElement("h1");
  wRetimer.append(heading);
  heading.textContent = "Retimer tool";
  heading.classList.add("fill-row");

  const lbCurrentTime = document.createElement("label");
  wRetimer.append(lbCurrentTime);
  lbCurrentTime.textContent = "Current time:";
  lbCurrentTime.setAttribute("for", "i-current");

  const iCurrentTime = document.createElement("input");
  wRetimer.append(iCurrentTime);
  iCurrentTime.value = 0;
  iCurrentTime.setAttribute("id", "i-current");

  const segments = document.createElement("textarea");
  wRetimer.append(segments);
  segments.classList.add("fill-row");

  const lbFinalTime = document.createElement("label");
  wRetimer.append(lbFinalTime);
  lbFinalTime.textContent = "Final time:";
  lbFinalTime.setAttribute("for", "i-final");

  const iFinalTime = document.createElement("input");
  wRetimer.append(iFinalTime);
  iFinalTime.value = 0;
  iFinalTime.setAttribute("id", "i-final");
  iFinalTime.setAttribute("disabled", "");

  const lbFinalFormat = document.createElement("label");
  wRetimer.append(lbFinalFormat);
  lbFinalFormat.textContent = "Formatted final time:";
  lbFinalFormat.setAttribute("for", "i-final-format");

  const iFinalFormat = document.createElement("input");
  wRetimer.append(iFinalFormat);
  iFinalFormat.value = 0;
  iFinalFormat.setAttribute("id", "i-final-format");
  iFinalFormat.setAttribute("disabled", "");

  const explanation = document.createElement("div");
  wRetimer.append(explanation);
  explanation.classList.add("fill-row");
  explanation.innerHTML =
`<h2>Explanation</h2>
<p>Enter ranges of times into the textarea in JSON-format. Example:</p>
<pre><code>[
  [0, 20],
  [23, 28],
  [31.5, 37.3]
]</code></pre>
<p>Additionally:</p>
<ul>
  <li><code>1</code> through <code>9</code>: Skip to evenly distributed points in time of the video.</li>
  <li><code>J</code> and <code>L</code>: Skip backward/forward in 10s steps.</li>
  <li><code>Left arrow</code> and <code>Right arrow</code>: Skip backward/forward in 5s steps.</li>
  <li><code>,</code> and <code>.</code>: While paused, skip backward/forward in single-frame steps.</li>
  <li><code>Home</code> and <code>End</code>: Skip to the start/end of the video.</li>
</ul>`;

  document.body.append(fragment);

  // Modify player
  document.getElementById("player").style.cssText = "";
  const videoPlayer = document.querySelector("video");
  videoPlayer.id = "video-player";
  videoPlayer.addEventListener("timeupdate", () => iCurrentTime.value = videoPlayer.currentTime);
  iCurrentTime.addEventListener("change", () => {
    videoPlayer.currentTime = iCurrentTime.value;
  });

  // Segments functionality
  segments.addEventListener("input", () => {
    try {
      const ranges = JSON.parse(segments.value);
      const times = ranges.map(([ start, end ]) => end - start);
      const finalTime = times.reduce((time, t) => time + t, 0);

      iFinalTime.value = finalTime;
      iFinalFormat.value = formatSeconds(finalTime);
    } catch {
      iFinalTime.value = "NaN";
      iFinalFormat.value = "NaN";
    }
  });
};