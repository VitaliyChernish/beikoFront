import React, { useState } from "react";
import s from './cabinet.module.scss';
import { parseData } from "../utils/functions";
import UserCabinetMain from "./userCabinetMain/UserCabinetMain";
import UserCabinetOrders from "./userCabinetOrders/UserCabinetOrders";
import { useDispatch } from "react-redux";
import { auth } from "../store/isAuth/actionsAuth";
import { useNavigate } from "react-router-dom";

const vidgetItems = [
  { text: 'Main', icon: 'person-outline' },
  { text: 'My orders', icon: 'home-outline' },
  { text: 'My callback', icon: 'call-outline' },
  { text: 'Exit' }
]

const UserCabinet = () => {
  const [active, setActive] = useState('Main')
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const exitUserCabinet = () => {
    const defaultData = { "token": '', "name": '', "role": '', "avatar": '' };
    localStorage.setItem('data', JSON.stringify(defaultData));
    return dispatch(auth(parseData('role')))
  }
  console.log('localstorageFromUserCabinet: ', localStorage.getItem('data'))
  const renderContent = () => {
    switch (active) {
      case "Main":
        return <UserCabinetMain />;
      case "My orders":
        return <UserCabinetOrders />
      case "Exit":
        exitUserCabinet();
        navigate('/')
        break;
      default:
        return <UserCabinetMain />

    }
  }

  return (
    <div className={s.mainContainer}>
      <div><h1>Hello {parseData('name')}</h1></div>
      <div className={s.leftVidget}>
        {vidgetItems.map(el => {
          return (
            <div className={s.leftVidgetItem} onClick={() => setActive(el.text)}>
              <div className={s.icon}><ion-icon name={el.icon}></ion-icon></div>
              <div className={s.title}>{el.text}</div>
            </div>
          )
        })}
      </div>
      <div className={s.mainInfo}>
        {renderContent()}
      </div>
    </div>
  )
}

export default UserCabinet;