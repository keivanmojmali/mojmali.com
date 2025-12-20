# Why 


I throw on a lot of YouTube videos while I code. Podcasts, music, and other things that do not require full attention. However, YouTube keeps pulling me back in. Comments change with the timestamp, the subscribe button glows when prompted, and other little tricks.

Even in theater mode, if you make the video too large, the distractions reappear.

The main purpose of this extension is to keep YouTube from distracting me.
Bonus: I get to try Google’s extension publishing process.

# Extension

It’s a simple extension. It just needs to fullscreen the video in-tab with an optimal fit, plus a few extra niceties.

Here are the links if you want to check it out for yourself.

**Download ->** [Download Zenview](https://chromewebstore.google.com/detail/zenview/ljbjebfcbcaplgbgajcjhnddcncafibb)

**GitHub ->** [Zenview GH](https://github.com/keivanmojmali/zenview)

### Features:
- Toggle ON/OFF with extension dropdown
- Badge indicator when it’s ON
- Detects when you’re on a YouTube video
- Keyboard shortcuts to toggle ON/OFF

### Package Size and Stack:
- Small footprint (~93 KB)
- Vanilla JS and CSS

### How it Works:
- Injects CSS into the page to hide distracting elements
- Background service workers handle badging, keyboard shortcuts/settings, and other extension commands and tab communication
- Popup detects if you’re on a YouTube video and shows the slider and current shortcut
- A separate page shows how to set the keyboard shortcuts

**Screenshots**:

Demo video we’re using
![YouTube video by Casey Neistat](/images/zenview-1.png)

When you hit the extension while on a YouTube video, you will see this dropdown
![Picture of the Zenview dropdown](/images/zenview-2.png)

If you are not on a YouTube video, you will see this instead
![Picture of Zenview dropdown](/images/zenview-5.png)

Once you toggle ZenView on, it will fullscreen inside of the tab
![Picture of a YouTube video fullscreen inside of a tab](/images/zenview-3.png)

Here is another look zoomed out so it is easier to see
![Picture of Zenview fullscreen but zoomed out](/images/zenview-6.png)

You can also set custom keybindings for turning ON/OFF 
![Picture of Zenview custom keybinding page](/images/zenview-4.png)

### Takeaways
The main takeaway: building extensions is straightforward, and submission is easy. My hunch was that because we are messing with YouTube and then submitting through Google Web Store that it is going to be a nightmare (judging from using Google's OAuth/SSO and even just getting a gemini token).

One note is that the extension is very small, does not collect any data and does not use any major permissions, which definitely contributed to the smooth process. 

You can also make a personal, unsubmitted extension: go to Extensions in Dev Mode, load an unpacked build, and you’re set.