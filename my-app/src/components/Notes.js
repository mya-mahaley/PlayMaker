import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import blank from "../images/blank_bg.jpg";
import football from "../images/football_bg.png";
import basketball from "../images/basketball_bg.jpg";
import baseball from "../images/baseball_bg.jpg";
import { useState } from "react";


export default function Notes(props) {
  const [players, setPlayers] = useState("");
  const [stats, setStats] = useState("");
  const [problems, setProblems] = useState("");
  const [comments, setComments] = useState("");

  return(
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notes
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Players</Form.Label>
            <Form.Control as="textarea" rows={1} onChange={(e) => {setPlayers(e.target.value)}} defaultValue={players}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Statistics</Form.Label>
            <Form.Control as="textarea" rows={1} onChange={(e) => {setStats(e.target.value)}} defaultValue={stats}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Problems</Form.Label>
            <Form.Control as="textarea" rows={1} onChange={(e) => {setProblems(e.target.value)}} defaultValue={problems}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comments</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => {setComments(e.target.value)}} defaultValue={comments}/>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
