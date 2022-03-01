# YouTube retime
A tool for timing sections of videos uploaded to YouTube.

## Prerequisites
* [NodeJS](https://nodejs.org/).
* A [Chromium-based browser](https://en.wikipedia.org/wiki/Chromium_(web_browser)#Active).

## How to use
1. Set `CHROMIUM` to the Chromium-based browser's executable path.
2. Find the YouTube video's ID. Here's where to find it in a URL:
   * `https://youtube.com/watch?v=VIDEO_ID`
   * `https://youtu.be/VIDEO_ID`
   * `https://youtube.com/embed/VIDEO_ID`
3. Run `npm start -- VIDEO_ID` where `VIDEO_ID` is the ID from step 2.

Once started, your browser will open the video and insert a GUI to time sections. Skip through the video and write down the times in range-pairs in JSON-format.

The final time (in both seconds-only and a more natural format) will be displayed at the end.

## Afterword
Guh, not fancy this thing. Puppeteer forced me to write the code fully enclosed in functions, which meant that I couldn't compose the functions with imported modules.

I did see [`yt-frame-timer`](https://slashinfty.github.io/yt-frame-timer/) only after having written this program, but I think it's still lacking the "in sections" feature that I have. Using the debug info to extract the video's current time is pretty smart, and I'll likely copy this technique in a future project.

Also, I _won't_ use puppeteer in the future for such a task again. I think having it on a separate site is good enough, and copy-pasting the debug info isn't really much additional work, especially compared to what you have to use in this program.

Also also, it's quite unreasonable to have end-users start up programs in this (my program's) fashion nowadays. It would be best to have this as a webpage, like the aforementioned `yt-frame-timer`.
