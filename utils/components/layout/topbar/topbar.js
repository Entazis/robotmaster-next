import React, {useState, useEffect} from 'react';
import {useRouter} from "next/router";
import {
  NavDropdown
} from 'react-bootstrap';
import useTranslation from "../../../hooks/useTranslation";
import {languageNames} from '../../../../lib/translations/config';
import Link from 'next/link';
import { FaBars, FaGlobeAmericas, FaCaretDown } from "react-icons/fa";

//TODO: copied from the old codebase, refactor

const topbar = () => {
  const { locale, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTopbarFixed, setIsTopbarFixed] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const router = useRouter();
  const page = router.asPath.split('/').slice(2).join('/');

  useEffect(() => {
    handleScroll();
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
  });

  const handleScroll = () => {
    const isScrolledFromTop = window.scrollY > 0;
    if (isScrolledFromTop !== isTopbarFixed) {
      setIsTopbarFixed(isScrolledFromTop);
    }
  }

  const handleResize = () => {
    setIsMobileScreen(window.innerWidth <= 991);
  }

  if (isMobileScreen) {
    return (
        <div className={'topbar topbarMobile ' + (isTopbarFixed ? 'topbarFixed' : '')}>
          <div className="container">
            <Link href={`/[lang]/contact/live-demo-request`} as={`/${locale}/contact/live-demo-request`} passHref>
              <a className={'btn btn-primary navbar-cta navbar-cta-first ' +
              (isTopbarFixed ? 'navbar-cta-fixed' : '')} >
                {t('topbar-live-demo')}
              </a>
            </Link>
            <Link href={`/[lang]/contact/contact-me-request`} as={`/${locale}/contact/contact-me-request`} passHref>
              <a className={'btn btn-primary navbar-cta ' +
              (isTopbarFixed ? 'navbar-cta-fixed' : '')} >
                {t('topbar-contact-me')}
              </a>
            </Link>

            <FaBars style={{fontSize: '25px', cursor: 'pointer', color: '#e32726'}}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}/>
          </div>
          <div
              className={'topbarMenu ' + (isMenuOpen ? 'topbarMenu--open ' : 'topbarMenu--closed ') +
              (isTopbarFixed ? 'topbarMenu--lower' : 'topbarMenu--upper')}>

            <Link href={`/[lang]/contact`} as={`/${locale}/contact`} >
              <a>
                {t('contact-page-caption')}
              </a>
            </Link>
            <Link href={`/${locale}/newsroom`} >
              <a>
                {t('blog-page-caption')}
              </a>
            </Link>
            <a href='https://robotmaster.atlassian.net/servicedesk/customer/portals' target="_blank">
              {t('topbar-support')}
            </a>

            <NavDropdown id="language-chooser" title={<div>{languageNames[locale]} <FaGlobeAmericas/> <FaCaretDown/> </div>}>
              {Object.keys(languageNames).map(key => {
                if (languageNames[key]) {
                  return (
                      <Link href={`/[lang]/${page}`} as={`/${key}/${page}`} key={key} passHref>
                        <NavDropdown.Item>
                          {languageNames[key]}
                        </NavDropdown.Item>
                      </Link>
                  );
                }
              })}
            </NavDropdown>
          </div>
        </div>
    );
  }

  return (
      <div className={'topbar ' + (isTopbarFixed ? 'topbarFixed' : '')}>
        <div className="container">
          <Link href={`/[lang]/contact/live-demo-request`} as={`/${locale}/contact/live-demo-request`} passHref>
            <a className={'btn btn-primary navbar-cta navbar-cta-first ' +
            (isTopbarFixed ? 'navbar-cta-fixed' : '')} >
              {t('topbar-live-demo')}
            </a>
          </Link>
          <Link href={`/[lang]/contact/contact-me-request`} as={`/${locale}/contact/contact-me-request`} passHref>
            <a className={'btn btn-primary navbar-cta ' +
            (isTopbarFixed ? 'navbar-cta-fixed' : '')} >
              {t('topbar-contact-me')}
            </a>
          </Link>

          <Link href={`/[lang]/contact`} as={`/${locale}/contact`} >
            <a>
              {t('contact-page-caption')}
            </a>
          </Link>
          <Link href={`/${locale}/newsroom`}>
            <a>
              {t('blog-page-caption')}
            </a>
          </Link>
          <a href='https://robotmaster.atlassian.net/servicedesk/customer/portals' target="_blank">
            {t('topbar-support')}
          </a>

          <NavDropdown id="language-chooser" title={<div>{languageNames[locale]}<FaGlobeAmericas className='faIcon'/><FaCaretDown/></div>}>
            {Object.keys(languageNames).map(key => {
              if (languageNames[key]) {
                return (
                    <Link href={`/[lang]/${page}`} as={`/${key}/${page}`} key={key} passHref>
                      <NavDropdown.Item>
                        {languageNames[key]}
                      </NavDropdown.Item>
                    </Link>
                );
              }
            })}
          </NavDropdown>
        </div>
      </div>
  );
};

export default topbar;
