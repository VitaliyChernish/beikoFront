import React, { useEffect, useState } from 'react';
import s from './content2.module.scss';
import SwipeSlider from '../../elements/swipeSlider/SwipeSlider';
import CustomHeader from '../../elements/customHeader/CustomHeader';
import { serverApi } from "../../utils/consts";
import { parseData, showMessage } from "../../utils/functions";

const text = window.innerWidth > 1199 ? `ЗAПИС І ЗЙОМКА ПОДКАСТІВ, ТА ОНЛАЙН ЗАХОДІВ` : `ЗAПИС І ЗЙОМКА ПОДКАСТІВ ТА ОНЛАЙН ЗАХОДІВ`;

const description = 'Стрімінг дозволяє вам залучати глядачів з усього світу, що дозволяє вам досягати широкої аудиторії. Це збільшує ваш потенціал для привернення нових клієнтів і підвищення уваги до вашої компанії або бренду. '
const description2 = `Онлайн-трансляції надають можливість активно спілкуватися з аудиторією у реальному часі. Чат, коментарі та голосові відповіді, які дозволяють спілкуватися з глядачами, відповідати на їх питання та отримувати від них зворотній зв'язок. Це дозволяє створити більш особисту зв'язок і покращити залучення аудиторії до вашого бренду або події.`

const Content2 = () => {
  const [content, setContent] = useState([])
  const [idArr, setId] = useState([])

  const getImageFromServer = () => {

    let idArrey = []
    let allContent = []

    fetch(`${serverApi}:5000/api/slider1/getAllOSlides`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        data.forEach(el => {
          idArrey.push(el.id)
          allContent.push(el)
        });
        setContent(allContent);
        setId(idArrey);
        showMessage('data is ok', 500); // Виведення повідомлення з сервера
      })
      .catch(error => {
        console.error('Помилка при завантаженні зображень:', error);
      });
  }

  useEffect(() => {
    getImageFromServer();
  }, []);

  const deleteImg = (index) => {
    const token = parseData('token')
    const url = `${serverApi}:5000/api/slider1/delete/${index}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Обробка успішного видалення
        showMessage(data.message + '! ПЕРЕЗАВАНТАЖ СТОРІНКУ!', 5000);
      })
      .catch(error => {
        // Обробка помилки
        console.error('Error deleting offer:', error);
      });
  }

  function deleteImgMiddleware(index) {
    deleteImg(index)
  }


  return (
    <div className={s.content2Main}>
      <div className={s.triangleTop}></div>
      <div className={s.triangleBottom}></div>
      <div id="contentForScrollingAnimation2" className={s.header} >
        <CustomHeader text={text} descriptions={[description, description2]} />
      </div>
      <div id="contentForScrollingAnimation3" className={s.largeImageContainer} >
        {content.length > 0 && idArr.length > 0 && (
          <SwipeSlider
            idArr={idArr}
            content={content.map((el) => (
              parseData('role') === 'ADMIN'
                ? <div className={s.largeImage}>
                  <div onClick={() => deleteImgMiddleware(el.id)} className={s.delete}>DELETE</div>
                  <img src={`${serverApi}:5000/static/${el.sliderImageName}`} alt="" />
                </div>
                : <img src={`${serverApi}:5000/static/${el.sliderImageName}`} className={s.largeImage} alt="" />
            ))}
          />
        )}
      </div>
    </div>
  );
};

export default Content2;