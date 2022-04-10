import { render } from '@testing-library/react';

import Article from './index';

describe('Article', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Article />);
    expect(baseElement).toBeTruthy();
  });
});
