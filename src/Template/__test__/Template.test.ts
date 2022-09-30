import { describe, expect } from '@jest/globals';
import Template from '../index';
import { ALL_TEMPLATE_TRANSFORMATIONS, TemplateTransformations } from '../types';

describe('Template', () => {
  // next describe group
  describe('clear / reset / replace / add / default transformations', () => {
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

      const inputText = '**Lorem** Ipsum\n\n___*industry*___';
      const outText = '**Lorem** Ipsum<br/><br/>___*industry*___';

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

    it('should be reset transformations', () => {
      const tpl = new Template();

      expect(tpl.clearTransformations().getTransformationsName().length).toBe(0);
      expect(tpl.resetTransformations().getTransformationsName().length).toBeGreaterThan(0);
    });

    it('should be a transformation definition by name', () => {
      const tpl = new Template();

      for (const t of ALL_TEMPLATE_TRANSFORMATIONS) {
        expect(tpl.pickTransformation(t).getTransformationsName().length).toBe(1);
      }
    });

    it.concurrent('should be a transformation by each implementation', () => {
      expect(ALL_TEMPLATE_TRANSFORMATIONS).toEqual(new Template().getTransformationsName());
    });
  });

  // next describe group
  describe('transformations', () => {
    it('should be a abbreviated text', () => {
      const tpl = new Template();

      const inputText = `~abbr=[United States of America]~USA~abbr~ lorem ipsum ~abbr=[Dolor Sit Amet Consectetur]~DSAC~abbr~`;
      const outText = `<abbr title="United States of America">USA</abbr> lorem ipsum <abbr title="Dolor Sit Amet Consectetur">DSAC</abbr>`;

      expect(tpl.atob(inputText)).toEqual(outText);
      expect(tpl.btoa(outText)).toEqual(inputText);
    });

    it('should be bold', () => {
      const tpl = new Template();

      const inputText = 'Lorem ipsum **dolor** sit **amet consectetur**...';
      const outText = 'Lorem ipsum <b>dolor</b> sit <b>amet consectetur</b>...';

      expect(tpl.atob(inputText)).toEqual(outText);
      expect(tpl.btoa(outText)).toEqual(inputText);
    });

    it('should be italic', () => {
      const tpl = new Template();

      const inputText = 'Lorem ipsum ~~dolor~~ sit ~~amet consectetur~~...';
      const outText = 'Lorem ipsum <i>dolor</i> sit <i>amet consectetur</i>...';

      expect(tpl.atob(inputText)).toEqual(outText);
      expect(tpl.btoa(outText)).toEqual(inputText);
    });

    it('should be underline', () => {
      const tpl = new Template();

      const inputText = 'Lorem ipsum ___*dolor*___ sit ___*amet consectetur*___...';
      const outText = 'Lorem ipsum <u>dolor</u> sit <u>amet consectetur</u>...';

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

      const inputText = 'Lorem ipsum [dolor](https://www.lipsum.com/){"target": "_blank"} ~~sit amet~~...';
      const outText = 'Lorem ipsum <a href="https://www.lipsum.com/" target="_blank">dolor</a> <i>sit amet</i>...';

      expect(tpl.atob(inputText)).toEqual(outText);
      expect(tpl.btoa(outText)).toEqual(inputText);
    });

    it('should be link with another attributes', () => {
      const tpl = new Template();

      const inputText =
        'Lorem ipsum [dolor](https://www.lipsum.com/){"target": "_blank", "class": "green", "id": "lorem-1"} sit [amet link](https://www.lipsum.com/){"target": "_blank"}...';
      const outText =
        'Lorem ipsum <a href="https://www.lipsum.com/" target="_blank" class="green" id="lorem-1">dolor</a> sit <a href="https://www.lipsum.com/" target="_blank">amet link</a>...';

      expect(tpl.atob(inputText)).toEqual(outText);
      expect(tpl.btoa(outText)).toEqual(inputText);
    });

    it('should be a deleted text', () => {
      const tpl = new Template();

      const inputText = '~del~Lorem~del~ ipsum ~del~dolor~del~ sit amet...';
      const outputText = '<del>Lorem</del> ipsum <del>dolor</del> sit amet...';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be a subscript text', () => {
      const tpl = new Template();

      const inputText = '~sub~Lorem~sub~ ipsum dolor ~sub~sit~sub~ amet...';
      const outputText = '<sub>Lorem</sub> ipsum dolor <sub>sit</sub> amet...';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be a superscript text', () => {
      const tpl = new Template();

      const inputText = '~sup~Lorem~sup~ ipsum dolor ~sup~sit~sup~ amet...';
      const outputText = '<sup>Lorem</sup> ipsum dolor <sup>sit</sup> amet...';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be a horizontal rule A', () => {
      const tpl = new Template();

      const inputText = '--- ipsum dolor sit amet...';
      const outputText = '<hr/> ipsum dolor sit amet...';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be a horizontal rule B', () => {
      const tpl = new Template();

      const inputText = 'Lorem ipsum *** dolor sit amet...';
      const outputText = 'Lorem ipsum <hr/> dolor sit amet...';
      const inputTextOutput = 'Lorem ipsum --- dolor sit amet...';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputTextOutput);
    });

    it('should be different titles sizes', () => {
      const tpl = new Template();

      const inputText = 't1{Title One} t2{Title Two} ... t6{Title Six}';
      const outputText = '<h1>Title One</h1> <h2>Title Two</h2> ... <h6>Title Six</h6>';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be paragraphs', () => {
      const tpl = new Template();

      const inputText = 'p{Paragraph One} p{Paragraph Two} p{Paragraph Six}';
      const outputText = '<p>Paragraph One</p> <p>Paragraph Two</p> <p>Paragraph Six</p>';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be lists ordered', () => {
      const tpl = new Template();

      const inputText = 'First: ol[Item One||Item Two||Item Six]';
      const outputText = 'First: <ol><li>Item One</li><li>Item Two</li><li>Item Six</li></ol>';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be lists unordered', () => {
      const tpl = new Template();

      const inputText = 'Second: ul[Item One||Item Two||Item Six]';
      const outputText = 'Second: <ul><li>Item One</li><li>Item Two</li><li>Item Six</li></ul>';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be lists ordered and unordered', () => {
      const tpl = new Template();

      const inputText = 'First: ol[Item One||Item Two||Item Six], Second: ul[Item One||Item Two||Item Six]';
      const outputText =
        'First: <ol><li>Item One</li><li>Item Two</li><li>Item Six</li></ol>, Second: <ul><li>Item One</li><li>Item Two</li><li>Item Six</li></ul>';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });
  });

  // next describe
  describe('pick / omit', () => {
    it('should be pick 3 transformation', () => {
      const tpl = new Template();

      expect(
        tpl.pickTransformation<TemplateTransformations>('abbrev', 'bold', 'link').getTransformationsName().length,
      ).toBe(3);
    });

    it('should be select a transformation to apply', () => {
      const tpl = new Template().pickTransformation<TemplateTransformations>('link', 'bold');

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

    it('should be a styled text picked', () => {
      const tpl = new Template().pickTransformation('style');

      const inputText =
        '~style=[color: red; font-weight: bold]~Lorem~style~ ipsum dolor ~style=[color: #CCC]~sit amet~style~...';
      const outputText =
        '<span style="color: red; font-weight: bold">Lorem</span> ipsum dolor <span style="color: #CCC">sit amet</span>...';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be a upsercase text picked (TS)', () => {
      type CustomTemplateTransformations = TemplateTransformations | 'uppercase';

      const tpl = new Template()
        .addTransform({
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
        })
        .pickTransformation<CustomTemplateTransformations>('uppercase');

      const inputText = '**Lorem** ipsum dolor ~up~sit~up~ amet...';
      const outputText = '**Lorem** ipsum dolor <span class="text-uppercase">sit</span> amet...';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be omit 3 transformation', () => {
      const tpl = new Template();

      expect(
        tpl.omitTransformation<TemplateTransformations>('abbrev', 'bold', 'link').getTransformationsName().length,
      ).toBe(tpl.getTransformationsName().length - 3);
    });

    it('should be omit one or more transformations', () => {
      const tpl = new Template().omitTransformation('bold');

      const inputText = 't1{Title One} **Omitted** ---';
      const outputText = '<h1>Title One</h1> **Omitted** <hr/>';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });

    it('should be omit one or more transformations (TS)', () => {
      const tpl = new Template().omitTransformation<TemplateTransformations>('bold');

      const inputText = 't1{Title One} **Omitted** ---';
      const outputText = '<h1>Title One</h1> **Omitted** <hr/>';

      expect(tpl.atob(inputText)).toEqual(outputText);
      expect(tpl.btoa(outputText)).toEqual(inputText);
    });
  });
});
