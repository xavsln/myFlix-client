import React, { useState } from 'react';

import { UserInfo } from './user-info';

import { Container, Row, Col, Card } from 'react-bootstrap';

export function ProfileView(props) {
  console.log(props);

  return (
    <Container>
      <Row>
        <Col xs={12} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Your Profile information:</h4>
              </Card.Title>
              <UserInfo />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Profile update:</h4>
              </Card.Title>
              <UserInfo />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4>Favorite movies</h4>
    </Container>
  );
}
