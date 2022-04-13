import React, { useState } from 'react';
import Login from './Login';
import Register from './Register'
import { Row, Col } from 'react-bootstrap';
const titelTab = [
  {
    id: 1,
    title: 'ورود',
    content: <Login data={{ email: "",
password: "",
    }} />
  },
  {
    id: 2,
    title: 'ثبت نام',
    content: <Register />
  }
];

export default function Tab() {
  const [active, setActive] = useState(1);

  return (
    <Row>
      <Col xs={{ span: 10, offset: 1 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 4 }} className="form mt-5 p-4 ">
        <span className="tabtitle d-flex">
          {titelTab.map(({ id, title }) => <Tabitems
            key={title}
            title={title}
            itemSelected={() => setActive(id)}
            isActive={active === id}
          />
          )}
        </span>
        <div>
          {titelTab.map(({ id, content }) => {
            return active === id ? content : ''
          })}
        </div>
      </Col>
    </Row>
  )
}

const Tabitems = ({
  title = '',
  itemSelected = () => console.error('no action'),
  isActive = false,
}) => {
  return (
    <div className={isActive ? 'tabitem' : 'tabitem tab-noActive'} onClick={itemSelected}>
      <label className=" w-100  text-white  text-center my-2" >{title}</label>
    </div>
  )
}

