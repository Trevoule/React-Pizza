/* eslint-disable no-undef */
const File = require('vinyl');
const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');

const SOURCES = ['icons'];

SOURCES.forEach((source) => {
  const DEST_PATH = path.resolve(`./src/assets/${source}/`);
  const ICONS_PATH = path.join(DEST_PATH, '/sprite/');
  const config = {
    dest: DEST_PATH,
    svg: {
      rootAttributes: {
        class: 'svg-sprite'
      }
    },
    mode: {
      inline: true,
      symbol: true
    },
    transform: [
      {
        svgo: {
          plugins: [
            {
              cleanupIDs: false
            }
          ]
        }
      }
    ]
  };

  const spriter = new SVGSpriter(config);

  const files = fs.readdirSync(ICONS_PATH);
  console.log('');
  console.log('************');
  console.log(source.toUpperCase());
  console.log('************');
  files.forEach((file) => {
    console.log('Adding file: ', file);
    spriter.add(
      new File({
        path: path.join(ICONS_PATH, file), // Absolute path to the SVG file
        base: ICONS_PATH, // Base path (see `name` argument)
        contents: fs.readFileSync(path.join(ICONS_PATH, file)) // SVG file contents
      })
    );
  });

  spriter.compile((err, result) => {
    if (err) {
      throw err;
    }

    fs.writeFileSync(path.join(DEST_PATH, '/sprite.svg'), result.symbol.sprite.contents);
  });
});
