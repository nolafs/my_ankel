import { render } from '@testing-library/react';

import SharePage from './share-page';

describe('SharePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharePage />);
    expect(baseElement).toBeTruthy();
  });
});
