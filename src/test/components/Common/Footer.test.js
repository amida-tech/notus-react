import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from 'components/Common/Footer';
import { amidaUrl, licenseUrl } from 'test/resources/constants/CommonConstants';

describe('Footer.js', () => {
    beforeAll(() => {
        // Control passing of time for testing
        jest.useFakeTimers('modern');
        // Set the fake system time to a fixed date
        jest.setSystemTime(new Date('2025-02-03T10:00:00Z'));
    });

    afterAll(() => {
        // Restore real timers and the original Date
        jest.useRealTimers();
    });

    it('renders as expected', () => {
        render(<Footer />);

        // Identify the logo by alt text
        const logo = screen.getByAltText(/Amida Logo/i);
        // Assert the correct logo by src
        expect(logo.src).toContain('amida_logo.png');

        // Identify all links on page
        const links = screen.getAllByRole('link');
        // Assert the correct number of links
        expect(links.length).toBe(3);
        // Assert the correct link references
        expect(links[0].href && links[1].href).toContain(amidaUrl);
        expect(links[2].href).toBe(licenseUrl);
    });
});
