import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from 'components/Utilities/Alert';
import { BrowserRouter } from 'react-router-dom';
import { options } from 'test/resources/constants/AlertConstants';

describe('Alert.js', () => {
    // Instantiate mock functions
    let mockSetOpenAlert;
    let mockHandleResetData;
    // Mock the functions before each test
    beforeEach(() => {
        mockSetOpenAlert = jest.fn();
        mockHandleResetData = jest.fn();
    });
    // Restore all mocks after each test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders the no result alert correctly', () => {
        render(
            <BrowserRouter>
                <Alert
                    openAlert={true}
                    setOpenAlert={mockSetOpenAlert}
                    title={'Test Title'}
                    handleResetData={mockHandleResetData}
                    options={options}
                />
            </BrowserRouter>
        );
        // Identify & click the go back button
        const goBackBtn = screen.getByText(/Go Back/i);
        fireEvent.click(goBackBtn);
        // Assert setOpenAlert to have been called
        expect(mockSetOpenAlert).toBeCalledWith(false);

        // Identify & click the continue button
        const continueBtn = screen.getByText(/Continue/i);
        fireEvent.click(continueBtn);
        // Assert setOpenAlert to have been called
        expect(mockSetOpenAlert).toBeCalledWith(false);
    });

    it('renders the no result alert correctly', () => {
        render(
            <Alert
                openAlert={true}
                setOpenAlert={mockSetOpenAlert}
                noResultsALERT={true}
                title={'Test Title'}
                handleResetData={mockHandleResetData}
            />
        );
        // Identify and click the reset data button
        const resetData = screen.getByText(/Reset Data/i);
        fireEvent.click(resetData);
        // Assert handle reset data to have been called
        expect(mockHandleResetData).toHaveBeenCalled();
    });

    it('the default prop setOpenAlert is set as expected', () => {
        render(
            <BrowserRouter>
                <Alert
                    openAlert={true}
                    options={options}
                    title={'Test Title'}
                />
            </BrowserRouter>
        );
        // Identify and click the go back button
        const goBackBtn = screen.getByText(/Go Back/i);
        fireEvent.click(goBackBtn);
        // Assert that it is in the document
        expect(goBackBtn).toBeInTheDocument();
    });

    it('the default prop, handleResetData is set as expected', () => {
        render(
            <BrowserRouter>
                <Alert
                    openAlert={true}
                    noResultsALERT={true}
                    options={options}
                    title={'Test Title'}
                />
            </BrowserRouter>
        );
        // Identify and click the rest data button
        const resetData = screen.getByText(/Reset Data/i);
        fireEvent.click(resetData);
        // Assert that it is in the document
        expect(resetData).toBeInTheDocument();
    });
});
