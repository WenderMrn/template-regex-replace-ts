import { describe, expect } from '@jest/globals';
import Template from '../Template';

describe('template', () => {
  it('should be empty transformation', () => {
    const tpl = new Template().clearTransformations();

    const inputText = `
    **Lorem** Ipsum is simply ~up~dummy~up~ text of the 
    [printing](https://en.wikipedia.org/wiki/Printing_press) and typesetting ___*industry*___. Lorem Ipsum has been
    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
    type and scrambled it to make a type ~~specimen book~~.\n\t It has survived not only five centuries, but also the
    leap into electronic typesetting, remaining essentially unchanged. ~abbr=[Estados Unidos da América]~EUA~abbr~
    `;

    expect(tpl.atob(inputText)).toEqual(inputText);
    expect(tpl.btoa(inputText)).toEqual(inputText);
    expect(tpl.getTransformationsName().length).toBe(0);
  });

  it('should be replace transformations', () => {
    const tpl = new Template().replaceTransformations({
      breakLine: {
        atob: {
          from: /\n/g,
          to: '<br/>',
        },
        btoa: {
          from: /(<br \/>|<br\/>|<br>)/g,
          to: '\n',
        },
      },
    });

    const inputText = '*Lorem** Ipsum\n\n___*industry*___';
    const outText = '*Lorem** Ipsum<br/><br/>___*industry*___';

    expect(tpl.atob(inputText)).toEqual(outText);
    expect(tpl.btoa(outText)).toEqual(inputText);
  });

  it('should be add a new transformations', () => {
    const tpl = new Template().addTransform({
      uppercase: {
        atob: {
          from: /~up~(.+)~up~/g,
          to: `<span class="text-uppercase">$1</span>`,
        },
        btoa: {
          from: /<span class="text-uppercase">(.+)<\/span>/g,
          to: '~up~$1~up~',
        },
      },
    });

    const inputText = 'Hello Transformation!\n\n~up~industry~up~';
    const outText = 'Hello Transformation!<br/><br/><span class="text-uppercase">industry</span>';

    expect(tpl.atob(inputText)).toEqual(outText);
    expect(tpl.btoa(outText)).toEqual(inputText);
  });

  it('should be replace by custom function', () => {
    const tpl = new Template().addTransform({
      abrev: {
        atob: {
          replace: (text: string) => text.replace(/~abbr=\[(.+)\]~(.+)~abbr~/g, `<abbr title="$1">$2</abbr>`),
        },
        btoa: {
          from: /<abbr title="(.+)">(.+)<\/abbr>/g,
          to: '~abbr=[$1]~$2~abbr~',
        },
      },
    });

    const inputText = `~abbr=[United States of America]~USA~abbr~`;
    const outText = `<abbr title="United States of America">USA</abbr>`;

    expect(tpl.atob(inputText)).toEqual(outText);
    expect(tpl.btoa(outText)).toEqual(inputText);
  });

  it('should be bold', () => {
    const tpl = new Template();

    const inputText = 'Lorem ipsum **dolor** sit amet...';
    const outText = 'Lorem ipsum <b>dolor</b> sit amet...';

    expect(tpl.atob(inputText)).toEqual(outText);
    expect(tpl.btoa(outText)).toEqual(inputText);
  });

  it('should be link', () => {
    const tpl = new Template();

    const inputText = 'Lorem ipsum [dolor](https://www.lipsum.com/) sit amet...';
    const outText = 'Lorem ipsum <a href="https://www.lipsum.com/">dolor</a> sit amet...';

    expect(tpl.atob(inputText)).toEqual(outText);
    expect(tpl.btoa(outText)).toEqual(inputText);
  });

  it('should be link target blank', () => {
    const tpl = new Template();

    const inputText = 'Lorem ipsum [dolor](https://www.lipsum.com/){"target": "_blank"} sit amet...';
    const outText = 'Lorem ipsum <a href="https://www.lipsum.com/" target="_blank">dolor</a> sit amet...';

    expect(tpl.atob(inputText)).toEqual(outText);
    expect(tpl.btoa(outText)).toEqual(inputText);
  });

  it('should be link with another attributes', () => {
    const tpl = new Template();

    const inputText =
      'Lorem ipsum [dolor](https://www.lipsum.com/){"target": "_blank", "class": "green", "id": "lorem-1"} sit amet...';
    const outText =
      'Lorem ipsum <a href="https://www.lipsum.com/" target="_blank" class="green" id="lorem-1">dolor</a> sit amet...';

    expect(tpl.atob(inputText)).toEqual(outText);
    expect(tpl.btoa(outText)).toEqual(inputText);
  });

  it('should be select a transformation to apply', () => {
    const tpl = new Template().pickTransformation('link', 'bold');

    const inputText = 'Lorem ipsum [dolor](https://www.lipsum.com/) sit **amet**...';
    const outText = 'Lorem ipsum <a href="https://www.lipsum.com/">dolor</a> sit <b>amet</b>...';

    expect(tpl.atob(inputText)).toEqual(outText);
    expect(tpl.btoa(outText)).toEqual(inputText);
  });

  it('should be not change text on select a invalid transformation to apply', () => {
    const tpl = new Template().pickTransformation('linkhtml'); // not exist

    const inputText = 'Lorem ipsum [dolor](https://www.lipsum.com/) sit amet...';

    expect(tpl.atob(inputText)).toEqual(inputText);
  });

  it('should be a styled text', () => {
    const tpl = new Template().pickTransformation('style');

    const inputText = '~style=[color: red; font-weight: bold]~Lorem~style~ ipsum dolor sit amet...';
    const outputText = '<span style="color: red; font-weight: bold">Lorem</span> ipsum dolor sit amet...';

    expect(tpl.atob(inputText)).toEqual(outputText);
    expect(tpl.btoa(outputText)).toEqual(inputText);
  });

  it('should be a deleted text', () => {
    const tpl = new Template();

    const inputText = '~del~Lorem~del~ ipsum dolor sit amet...';
    const outputText = '<del>Lorem</del> ipsum dolor sit amet...';

    expect(tpl.atob(inputText)).toEqual(outputText);
    expect(tpl.btoa(outputText)).toEqual(inputText);
  });

  it('should be a subscript text', () => {
    const tpl = new Template();

    const inputText = '~sub~Lorem~sub~ ipsum dolor sit amet...';
    const outputText = '<sub>Lorem</sub> ipsum dolor sit amet...';

    expect(tpl.atob(inputText)).toEqual(outputText);
    expect(tpl.btoa(outputText)).toEqual(inputText);
  });

  it('should be a superscript text', () => {
    const tpl = new Template();

    const inputText = '~sup~Lorem~sup~ ipsum dolor sit amet...';
    const outputText = '<sup>Lorem</sup> ipsum dolor sit amet...';

    expect(tpl.atob(inputText)).toEqual(outputText);
    expect(tpl.btoa(outputText)).toEqual(inputText);
  });

  it('should be a horintal rule A', () => {
    const tpl = new Template();

    const inputText = '--- ipsum dolor sit amet...';
    const outputText = '<hr/> ipsum dolor sit amet...';

    expect(tpl.atob(inputText)).toEqual(outputText);
    expect(tpl.btoa(outputText)).toEqual(inputText);
  });

  it('should be a horintal rule B', () => {
    const tpl = new Template();

    const inputText = 'Lorem ipsum *** dolor sit amet...';
    const outputText = 'Lorem ipsum <hr/> dolor sit amet...';
    const inputTextOutput = 'Lorem ipsum --- dolor sit amet...';

    expect(tpl.atob(inputText)).toEqual(outputText);
    expect(tpl.btoa(outputText)).toEqual(inputTextOutput);
  });

  it('should be diferents titles sizes', () => {
    const tpl = new Template();

    const inputText = 't1{Title One} t2{Title Two} ... t6{Title Six}';
    const outputText = '<h1>Title One</h1> <h2>Title Two</h2> ... <h6>Title Six</h6>';

    expect(tpl.atob(inputText)).toEqual(outputText);
    expect(tpl.btoa(outputText)).toEqual(outputText);
  });
});
