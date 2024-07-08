import React from 'react';
import { render } from '@testing-library/react';
import Metrics from '../components/Metrics';

jest.mock('../hooks/useToDoContext', () => () => ({
  metrics: {
    averageTimeTotal: '0:00',
    averageTimeLowTasks: '0:00',
    averageTimeMediumTasks: '0:00',
    averageTimeHighTasks: '0:00',
  },
}));

describe('Metrics Component', () => {
  it('displays average to do time metrics correctly', () => {
    const { getByText } = render(<Metrics />);
    
    expect(getByText('Average time to finish tasks')).toBeInTheDocument();
    expect(getByText('Average time to finish tasks by priority')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Metrics />);
    expect(container).toMatchSnapshot();
  });
});
