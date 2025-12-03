import { useEffect, useRef } from 'react';
import { useInspect, useStorage } from '~/lib/hooks';
import image1 from '~/lib/tutorial/image1.png';

export default function Tutorial() {
  const [scroll, setScroll] = useStorage('tutorial-scroll', '0' as string);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabview = ref.current?.closest('.p-tabview') as HTMLElement;
    if (!tabview) return;

    tabview.scrollTo({ top: parseInt(scroll), behavior: 'smooth' });

    const handle = (e: Event) => {
      setScroll(tabview?.scrollTop.toString() ?? '0');
    };

    tabview.addEventListener('scroll', handle);

    return () => {
      tabview?.removeEventListener('scroll', handle);
    }
  }, [ref]);

  return (
    <div className="px-4 **:my-4 text-sm" ref={ref}>
      <h1 className="text-3xl font-bold">Welcome to NeoDev!</h1>
      <p>NeoDev is a web development learning IDE, built to bridge your journey to learning web development, without the code.</p>
      <p>If you have little to no experience being a web developer and have encountered NeoDev for the first time, this tutorial is for you! Follow the steps below and you'll be creating websites in no time.</p>

      <h2 className="text-2xl font-semibold">1. The Starting Interface</h2>
      <img src={image1} alt={"1. The Starting Interface"} />
      <p>The starting interface is where all students begin.</p>
      <p>In this interface are several panels, each with their own specific uses and niche abilities:</p>

      <ul className='list-disc ml-8'>
        <li>The lists on the left side are what's known as frames. Each frame consists of one or more blocks, which represents something like a piece of text, or an image, or a link.
          All frames reside in what's known as the playground, which is a free, infinte canvas.</li>

        <li>The white large panel on the top right is the Preview Panel. You can see what your project looks like depending on how you arrange your frames and blocks in the playground.</li>
        <li>This panel that you are looking at now is what's known as the Info Panel. This panel has four functions, as indicated on the tabs above. You can view a block's properties, see what AI thinks of your project,
          and see a preview of what you are working on in real-world code, as well as view this tutorial in case you get lost.
        </li>
        <li>Lastly, at the center bottom is the Toolbar, a place where you can zoom in/out, drag the playground around by using the hand tool, and show or hide both the Preview and the Info panels.</li>
      </ul>

      <p>Try exploring the entire interface first before you actually begin building.</p>

      <h2 className="text-2xl font-semibold">2. Creating your first custom website</h2>
      <p>On the playground are two frames: the <strong>Template Frame</strong> and the <strong>Main Frame</strong>. The template frame is the source of all known blocks in NeoDev. The main frame are the list of blocks shown on the Preview.</p>
      <p>Try dragging a block (Blocks are the boxes inside these frames) labeled 'Paragraph Text' from the Template Frame to the lowest part of the Main Frame.</p>
      <p>If you have done so, there should be a new block labeled 'Hello NeoDev!' at the bottom. Try clicking on it.</p>
      <p>Now try changing the text "Hello Neodev!" to something else at the Properties subpanel. Try clicking on 'Properties', go to 'content', and change the text there to something like "Hello World!" or "Hello, &lt;Your Name&gt;! and come back to this tutorial.</p>
      <p>If you have done so, congratulations! You have officially created something new in NeoDev.</p>


      <h3 className="text-lg font-semibold">Adding new frames</h3>
      <p>In addition to the two existing frames, you can add new ones too! Just drag a new block to an empty space, far away from other frames.</p>

      <h3 className="text-lg font-semibold">Customizing frames</h3>
      <p>If you want, you could rename your frames to whatever you wish! Try right-clicking on the area on the left of the frame (either colored purple or orange).
        There is a list of options here, but try clicking on "Edit Frame Label" and set your new frame name. Don't forget to save it by clicking "Confirm and Exit"!</p>

      <h3 className="text-lg font-semibold">Adding frames inside other frames</h3>
      <p>Of course, there is a specific feature in NeoDev that is one of the most commonly used practices in web development: imports. In the modern era, web developers use imports all the time.
        It makes life easier by reducing the amount of repetition by copy-pasting the same code over and over again.</p>
      <p>Just like in real life, we can import frames inside other frames too! Try right-clicking on the area on the left of the frame, but this time, select "Import to Frame...".</p>
      <p>It should show a list of frames where you can import this frame into. Make sure that there are other existing frames in the playground!</p>

      <blockquote>
        <p><strong><span className="mr-2">⚠️</span> A Note on Circular Imports</strong></p>
        <p>A major caveat behind imports, especially direct ones, is that there might be some rare cases where two or more frames could import into each other, creating what's known as a circular import.
          Circular imports, in practice, create infinite recursion when they are resolved, which causes applications to lag or even freeze.</p>
        <p>Therefore, to prevent such things from crashing NeoDev, we have disabled circular imports entirely by filtering out invalid frames. Try attempting it and see what you find!</p>
      </blockquote>

      <h3 className="text-lg font-semibold">Style Blocks</h3>
      <p>Did you know that you could add more look and feel to blocks by adding styling? Yes, you can!</p>
      <p>By default, only blocks with some text in them have inherent properties for styling, such as font size and font family. You can extend this, however, by adding style blocks below it!</p>
      <p>Style blocks are a special type of block that could extend regular blocks with style-based properties! They are indicated by a solid fill, or sometimes a colorful one if it's color-based!</p>
      <p>Try dragging one below a regular block, and see what happens!</p>
      <p>You can also change the value of the style by clicking on it and changing its properties!</p>

      <blockquote>
        <p><strong><span className="mr-2">❓️</span>Did you know you could add styling to imports too?</strong></p>
        <p>Try adding a style block called "Alignment" below the import to find out!</p>
      </blockquote>

      <h2 className="text-2xl font-semibold">3. Keyboard Shortcuts</h2>
      <p>As always, there are shortcuts available for you if you are a keyboard based person.</p>

      <p>Here are the list of known shortcuts: </p>
      <ul className="list-disc ml-8">
        <li><kbd>Ctrl + (+/-)</kbd> to zoom in/out</li>
        <li><kbd>Ctrl + 0</kbd> to reset both the zoom and position of the playground</li>
        <li><kbd>Ctrl + P</kbd> to toggle the Preview Panel (you don't need to print this entire thing, do you?)</li>
        <li><kbd>Ctrl + I</kbd> to toggle the Info Panel</li>
        <li><kbd>Ctrl + Q</kbd> to reset the playground</li>
        <li><kbd>V</kbd> to switch to Default Mode (The mouse pointer symbol in the toolbar)</li>
        <li><kbd>H</kbd> to switch to Pan and Zoom Mode (the hand symbol in the toolbar)</li>
      </ul>

    </div>
  );
}