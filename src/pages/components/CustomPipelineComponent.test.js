// src/pages/components/CustomPipelineComponent.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomPipelineComponent from './CustomPipelineComponent';

describe('CustomPipelineComponent', () => {
  test('renders configuration title', () => {
    render(<CustomPipelineComponent />);
    const titleElement = screen.getByText(/configuration/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('toggles build checkbox', () => {
    render(<CustomPipelineComponent />);
    const buildCheckbox = screen.getByLabelText(/Build/i);
    expect(buildCheckbox).toBeChecked();

    fireEvent.click(buildCheckbox);
    expect(buildCheckbox).not.toBeChecked();
  });

  test('toggles test checkbox', () => {
    render(<CustomPipelineComponent />);
    const testCheckbox = screen.getByLabelText(/Test/i);
    expect(testCheckbox).toBeChecked();

    fireEvent.click(testCheckbox);
    expect(testCheckbox).not.toBeChecked();
  });

  test('toggles deploy checkbox', () => {
    render(<CustomPipelineComponent />);
    const deployCheckbox = screen.getByLabelText(/Deploy/i);
    expect(deployCheckbox).toBeChecked();

    fireEvent.click(deployCheckbox);
    expect(deployCheckbox).not.toBeChecked();
  });
});


