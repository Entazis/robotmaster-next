import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import useTranslation from '../../../hooks/useTranslation';
import classes from './navbar.module.css';
import Link from "next/link";

const navbar = () => {
  const { locale, t } = useTranslation();
  return (
      <Navbar bg='light' expand='lg' className={classes.navbarDefault}>
        <Container className={classes.navbarContainer}>
          <Link href='/' passHref>
            <Navbar.Brand className={classes.navbarBrand}>
              <div className={classes.logo} />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto text-center'>
              <Link href={`/[lang]/about`} as={`/${locale}/about`} passHref>
                <Nav.Link className={classes.navbarNavLiA}>{t('about-page-caption')}</Nav.Link>
              </Link>
              <Link href={`/[lang]/products`} as={`/${locale}/products`} passHref>
                <Nav.Link className={classes.navbarNavLiA}>{t('products-page-caption')}</Nav.Link>
              </Link>
              <Link href={`/[lang]/applications`} as={`/${locale}/applications`} passHref>
                <Nav.Link className={classes.navbarNavLiA}>{t('application-page-caption')}</Nav.Link>
              </Link>
              <Link href={`/[lang]/why-robotmaster`} as={`/${locale}/why-robotmaster`} passHref>
                <Nav.Link className={classes.navbarNavLiA}>{t('why-page-caption')}</Nav.Link>
              </Link>
              <Link href={`/${locale}/success-stories`} passHref>
                <Nav.Link className={classes.navbarNavLiA}>{t('success-page-caption')}</Nav.Link>
              </Link>
              <Link href={`/[lang]/partners`} as={`/${locale}/partners`} passHref>
                <Nav.Link className={classes.navbarNavLiA}>{t('partners-page-caption')}</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default navbar;
