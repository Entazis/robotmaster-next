import React, {useEffect} from 'react';
import useTranslation from "../../../utils/hooks/useTranslation";
import withLocale from '../../../utils/hocs/withLocale';
import Layout from '../../../utils/components/layout/layout';
import classes from './index.module.css';
import {Col, Container, Row} from "react-bootstrap";
import VideoList from '../../../utils/components/video-list/video-list';
import {isLocale} from "../../../lib/translations/types";
import Router from "next/router";
import {getInitialLocale} from "../../../lib/translations/getInitialLocale";

const welding = () => {
  const { t, locale } = useTranslation();
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLocale(locale)) {
      Router.replace(`/${getInitialLocale()}/${Router.pathname.split('/').slice(2).join('/')}`);
    }
  });

  return (
      <Layout banner={{
        caption: t('application-page-caption'),
        imageSrc: '/img/application/welding/banner.jpg'
      }}>
        <Container className={classes.application}>
          <Row>
            <Col md={12}>
              <h2 id={'path'} className={classes.applicationSubtitle}>
                {t('application-welding')}
              </h2>
              <p>
                {t('app-welding-para-1')}
              </p>
              <h3>
                {t('app-welding-subhead-1')}
              </h3>
              <ul>
                <li>
                  {t('app-welding-list-1-1')}
                </li>
                <li>
                  {t('app-welding-list-1-2')}
                </li>
                <li>
                  {t('app-welding-list-1-3')}
                </li>
                <li>
                  {t('app-welding-list-1-4')}
                </li>
                <li>
                  {t('app-welding-list-1-5')}
                </li>
              </ul>
              <h3>
                {t('application-videos')}
              </h3>
              <VideoList id={'welding'}/>
            </Col>
          </Row>
        </Container>
      </Layout>
  );
};

export default withLocale(welding);