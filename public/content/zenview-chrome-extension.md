# Huwhy 

I throw on a lot of YouTube videos while I code. Podcasts, music etc... and I reallllly hate the way YouTube does their theater mode. I also hate how the comments change throughout the video and catch my attention. 

So the main purpose of this extension is to stop YouTube from distracting me. As a bonus, since this is the first extension, I get to experience Google's extension publishing process.

# Extension 

It's a pretty simple extension. All I really want it to do is to fullscreen the video inside of the tab, showing as little of the black sidebars as possible. Meaning, it is optimally resized. Also, adding some bells and whistles.


**Download ->** [Download Zenview](https://chromewebstore.google.com/detail/zenview/ljbjebfcbcaplgbgajcjhnddcncafibb)

**GitHub ->** [Zenview GH](https://github.com/keivanmojmali/zenview)

**Features**:
- Toggle ON/OFF with extension dropdown
- Badging to show when it is ON
- Detect when you are on a YouTube video
- Keyboard shortcuts for turning ON/OFF

**Package Size and Stack**:
- Pretty small -> 93 KBs
- Vanilla JS and CSS

**How it Works**:
- Injects CSS to main body element to hide distracting elements 
- Background service workers manage badging, keyboard shortcut detection/settings and handle other Chrome extension commands and tab communication 
- Popup interface detects if you are on a YouTube video and displays slider and current shortcut
- A different page shows how to set the keyboard shortcuts 

**Screenshots**:

The YouTube video we will use for the demo. 
![YouTube video by Casey Neistat](/images/zenview-1.png)

When you hit the extension while on a YouTube video, you will see this dropdown.

![Picture of the Zenview dropdown](/images/zenview-2.png)

If you are not on a YouTube video, you will see this instead. 

![Picture of Zenview dropdown](/images/zenview-5.png)

Once you toggle ZenView on, it will fullscreen inside of the tab.

![Picture of a YouTube video fullscreen inside of a tab](/images/zenview-3.png)

Here is another look zoomed out so it is easier to see.

![Picture of Zenview fullscreen but zoomed out](/images/zenview-6.png)

You can also set custom keybindings for turning ON/OFF 

![Picture of Zenview custom keybinding page](/images/zenview-4.png)

### Takeaways
So this was much easier than expected. I assumed trying to mess around with YouTube videos + Submitting to Chrome Web Store was going to be a nightmare (judging from using their OAuth and even just getting a gemini token).
However the process was pretty pleasant. Also, it is quite easy to make an extension for yourself that you don't even submit to the Store. Just load an unpacked version to the Extensions in Dev mode and you are good to go. 