import { Box } from '@mui/system';
import React from 'react';
import amidaLogo from '../../assets/img/amida_logo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <hr className="footer__top-border" />
      <Box className="footer__flex-box">
        <Box className="footer__left-side">
          <img className="footer__left-side footer__left-side__logo" src={amidaLogo} alt="Amida Logo" />
          <Box className="footer__text footer__text__left">
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            <a
              href="https://www.amida.com"
              className="footer__text footer__text__left footer__text__left__link"
            >
              AMIDA TECHNOLOGY SOLUTIONS
            </a>
            {' '}
            - ALL RIGHTS RESERVED
          </Box>
        </Box>
        <Box className="footer__right-side">
          <ul className="footer__right-items">
            <li>
              <a
                href="https://www.amida.com"
                className="footer__text footer__text__right"
              >
                Amida
              </a>
            </li>
            <li>
              <a
                href="https://github.com/creativetimofficial/notus-react/blob/master/LICENSE.md?ref=nr-footer-admin"
                className="footer__text footer__text__right"
              >
                MIT License
              </a>
            </li>
          </ul>
        </Box>
      </Box>
    </footer>
  );
}
