import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const req = require.context('../src', true, /(?:\.stories\.tsx$)|(?:stories\/.*\.tsx$)/);
function loadStories() {
  addDecorator(
    withInfo({
      styles: {
        header: {
          h1: {
            marginRight: '20px',
            fontSize: '25px',
            display: 'inline',
          },
          body: {
            paddingTop: 0,
            paddingBottom: 0,
          },
          h2: {
            display: 'inline',
            color: '#999',
          },
        },
        infoBody: {
          backgroundColor: '#eee',
          padding: '0px 5px',
          lineHeight: '2',
        },
      },
      inline: true,
    })
  );
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
