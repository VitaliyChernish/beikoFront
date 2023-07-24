
import React, { useState, useEffect, Children, cloneElement } from "react";
import './swipeSlider.css';
import { parseData } from "../../utils/functions";
// import s from './swipeSlider.module.scss'

const SwipeSlider = ({content, idArr}) => {

  const [pages, setPages] = useState([])
  const [offset, setOffset] = useState(0)

  const handleButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if(parseData('role') === 'ADMIN'){
      return
    }
    const interval = setInterval(() => {
        let newOffset = offset - 100;
        if (newOffset < -(content.length - 1) * 100) {
          newOffset = 0;
        }
        setOffset(newOffset);
      }, 5000);
      return () => {
        clearInterval(interval); // Зупиняємо інтервал при розмонтуванні компонента
      };
  }, [offset]);


  const handleSwipe = (startingX, choiceTurn, numItems) => {
    const isSwipeLeft = startingX > choiceTurn;
    let newOffset = isSwipeLeft ? offset - 100 : offset + 100;
    if (newOffset < -(numItems - 1) * 100) {
      newOffset = 0;
    }
    if (newOffset > 0) {
      newOffset = -(numItems - 1) * 100;
    }
    setOffset(newOffset);
  }
  const handleClickPrev = (event) => {
    if (content) {
      event.preventDefault();
      event.stopPropagation();
      let newOffset = offset - 100;
      if (newOffset < -(content.length - 1) * 100) {
        newOffset = 0;
      }
      setOffset(newOffset);
    }
  }
  const handleClickNext = (event) => {
    if (content) {
      event.preventDefault();
      event.stopPropagation();
      let newOffset = offset + 100;
      if (newOffset > 0) {
        newOffset = -(content.length - 1) * 100;
      }
      setOffset(newOffset);
    }
  }
  useEffect(() => {
    setPages(
      Children.map(content, (child, index) => {
        return cloneElement((child), {
          id: idArr[index],
          style: {
            height: '100%',
            minWidth: '100%',
            maxWidth: '100%',
          },
          
          onClick: (event) => {
            // Перевірка, чи клікнуто на кнопці
            if (event.target.nodeName === 'BUTTON') {
              handleButtonClick(event);
            } else {
              // handleSwipe(startingX, choiceTurn, content.length);
            }
          }
        })
      })
    );
  }, [content, idArr]);

  useEffect(() => {
    if(!content){
      return
    }
    let startingX;
    let choiceTurn;
    const elemsArr = idArr.map((id) => document.getElementById(id)).filter(el => el);

    const touchStartHandler = (event) => {
      const isButton = event.target.tagName.toLowerCase() === 'button';
      if (isButton) {
        event.stopPropagation();
      } else {
        startingX = event.touches[0].clientX;
      }
    };

    const touchMoveHandler = (event) => {
      const isButton = event.target.tagName.toLowerCase() === 'button';
      if (isButton) {
        event.stopPropagation();
      } else {
        event.preventDefault();
        choiceTurn = event.touches[0].clientX;
      }
    };

    const touchEndHandler = (event) => {
      const isButton = event.target.tagName.toLowerCase() === 'button';
      if (!isButton || content) {
        handleSwipe(startingX, choiceTurn, content.length);
      }
    };

    elemsArr.forEach(el => {
      el.addEventListener('touchstart', touchStartHandler);
      el.addEventListener('touchmove', touchMoveHandler);
      el.addEventListener('touchend', touchEndHandler);
    });
    return () => {
      elemsArr.forEach(el => {
        el.removeEventListener('touchstart', touchStartHandler);
        el.removeEventListener('touchmove', touchMoveHandler);
        el.removeEventListener('touchend', touchEndHandler);
      });
    };

  }, [idArr, offset, pages]);

  return (

    <>
      <section id="swipeSlider" className='swiperSliderMainBox'>
        <div className="window">
          <div className="all-items-container"
            style={{
              transform: `translateX(${offset}%)`,
              transitionDuration: '1s',
            }}>
            {pages}
          </div>
        </div>
      </section>
      {window.innerWidth > 1199 &&
        <div className="slider" >
          <div className="arrows">
            <div className="arrowContainer" onClick={handleClickNext}>
              <div className="arrow left" ></div>
            </div>
            <div className="arrowContainer" onClick={handleClickPrev}>
              <div className="arrow right" ></div>
            </div>
          </div>
          <div className="dots">
            {content && (
              content.map((el, index) => {
                return (
                  index === (-offset / 100)
                    ? <div className="dot active"></div>
                    : <div className="dot"></div>
                )
              })
            )}
          </div>
        </div>}
    </>
  )
}

export default SwipeSlider;