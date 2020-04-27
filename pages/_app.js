import React from 'react';
import App from 'next/app';
import { appWithTranslation } from '../i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

//TODO: transform to use css modules
import '../components/layout/footer/footer.css';
import '../components/layout/navbar/navbar.css';
import '../components/layout/sidebar/sidebar.css';
import '../components/layout/social-actions/social-actions.css';
import '../components/layout/topbar/topbar.css';
import './[lang]/index.module.css';

class RobotMasterApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
        <Component {...pageProps} />
    )
  }
}

export default appWithTranslation(RobotMasterApp);