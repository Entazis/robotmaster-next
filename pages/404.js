import React from 'react';
import useTranslation from "../utils/hooks/useTranslation";
import Layout from "../utils/components/layout/layout";
import {Col, Container, Row} from "react-bootstrap";
import Link from "next/link";

const Custom404 = () => {
  const { t } = useTranslation();

  return (
      <Layout banner={{
        caption: t('notfound-page-caption')
      }}>
        <Container>
          <Row>
            <Col md={12}>
              <p>{t('notfound-page-message')}</p>
              <Link href={`/`} passHref>
                <a className="btn btn-primary btn-lg" >
                  {t('notfound-page-homepage-button')}
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </Layout>
  )
};

//TODO: custom404 cannot be used with HOC now (getInitialProps problem), withLocale is needed to translate to other languages
export default Custom404;