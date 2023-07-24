import { serverApi } from "./consts";
import moment from 'moment-timezone';

export function showMessage(message, duration) {
  const alertContainer = document.createElement('div');
  alertContainer.textContent = message;
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '5vw';
  alertContainer.style.left = '50%';
  alertContainer.style.transform = 'translateX(-50%)';
  alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  alertContainer.style.color = 'white';
  alertContainer.style.padding = '10px';
  alertContainer.style.borderRadius = '5px';
  alertContainer.style.zIndex = '9999'
  document.body.appendChild(alertContainer);

  setTimeout(function () {
    alertContainer.remove();
  }, duration);
}


export function checkAuth(token) {
  fetch(`${serverApi}:5000/api/user/auth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then(response => response.json())
    .then(data => {
      showMessage(data.message, 3000); // Виведення повідомлення з сервера
    })
    .catch(error => {
      console.error('Помилка при перевірці авторизації file My_index.html:', error);
    });
}

export const parseData = (key) => {
  const storedData = localStorage.getItem('data');
  const parsedData = JSON.parse(storedData);
  return parsedData[key]
}

export const deleteOffer = (event, index) => {
  event.preventDefault();
  event.stopPropagation()
  const url = `${serverApi}:5000/api/offers/delete/${index}`;
  const token = parseData('token')

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Обробка успішного видалення
      console.log(data.message)
      showMessage(data.message + '! ПЕРЕЗАВАНТАЖ СТОРІНКУ!', 5000);
    })
    .catch(error => {
      // Обробка помилки
      console.error('Error deleting offer:', error);
    });
}
export function createUser(name, shortDescription, fullDescription, price, imageForOffer) {
  const url = `${serverApi}:5000/api/offers/createOffers`; // URL для реєстрації
  const token = parseData('token')
  const formData = new FormData();

  formData.append('name', name);
  formData.append('shortDescription', shortDescription);
  formData.append('fullDescription', fullDescription);
  formData.append('price', price)
  formData.append('file', imageForOffer);

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Обробка відповіді сервера після реєстрації
      showMessage(data.message === undefined ? 'реєстрація успішна' : data.message, 3000); // Результат реєстрації (наприклад, токен)
    })
    .catch(error => {
      // Обробка помилок, якщо такі є
      showMessage(`Помилка при реєстрації: Неможливо з'єднатися з сервером`, 3000);
      console.error('Помилка при реєстрації:', error);
    });
}

export function updateOffer(name, shortDescription, fullDescription, price, imageForOffer, index) {
  const formData = new FormData();
  const token = parseData('token')

  formData.append('name', name);
  formData.append('shortDescription', shortDescription);
  formData.append('fullDescription', fullDescription);
  formData.append('price', price)
  formData.append('file', imageForOffer);
  const url = `${serverApi}:5000/api/offers/updateOffers/${index}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Обробка успішного оновлення
      showMessage(data.message === undefined ? 'Апдейт успішний' : data.message, 3000); // Результат реєстрації (наприклад, токен)
      console.log('Offer updated successfully:', data);
    })
    .catch(error => {
      // Обробка помилки
      showMessage(`Помилка при оновленні: Неможливо з'єднатися з сервером`, 3000);
      console.error('Error updating offer:', error);
    });
}

export const createClientData = (data, whatOffer, priceOffer) => {
  // Встановлюємо поточний час за київським часом
  let kievTime = moment().tz('Europe/Kiev');

  // Отримуємо години, хвилини, день, місяць та рік
  let hours = kievTime.format('HH');
  let minutes = kievTime.format('mm');
  let day = kievTime.format('DD');
  let month = kievTime.format('MM');
  let year = kievTime.format('YYYY');

  // Форматуємо дату та час у вигляді "години/дні/місяці/роки"
  let formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

  fetch(`${serverApi}:5000/api/clients/createClientData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientName: data.customerName,
      clientPhone: data.customerPhone,
      offerConfirmation: false,
      clientOffer: whatOffer,
      offerDetails: priceOffer,
      date: formattedDate
    })
  })
    .then(response => response.json())
    .then(data => {
      // Обробка відповіді сервера після реєстрації
      showMessage(data.message === undefined ? `Дякую, найближчим часом зв'яжусь із вами` : data.message, 3000); // Результат реєстрації (наприклад, токен)
    })
    .catch(error => {
      // Обробка помилок, якщо такі є
      showMessage(`Помилка при реєстрації: Неможливо з'єднатися з сервером`, 6000);
      console.error('Помилка при реєстрації:', error);
    });

}

export function getAllClientData(setCustomerDataFromServer) {
  fetch(`${serverApi}:5000/api/clients/getAllClientData`)
    .then(response => response.json())
    .then(skills => {
      setCustomerDataFromServer(skills);
    })
    .catch(error => console.error(error));
}

export function updateClientData(
  clientEmail,
  clientTelegram,
  clientOffer,
  offerConfirmation,
  offerDetails,
  index
) {
  const formData = new FormData();
  const token = parseData('token')

  formData.append('clientEmail', clientEmail);
  formData.append('clientTelegram', clientTelegram)
  formData.append('clientOffer', clientOffer);
  formData.append('offerConfirmation', offerConfirmation);
  formData.append('offerDetails', offerDetails);

  const url = `${serverApi}:5000/api/clients/updateClientData/${index}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Обробка успішного оновлення
      showMessage(data.message === undefined ? 'Апдейт успішний' : data.message, 3000); // Результат реєстрації (наприклад, токен)
      console.log('Client data update successfull:', data);
    })
    .catch(error => {
      // Обробка помилки
      showMessage(`Помилка при оновленні: Неможливо з'єднатися з сервером`, 3000);
      console.error('Error updating offer:', error);
    });
}
export const deleteClientData = (event, index) => {
  event.preventDefault();
  event.stopPropagation()
  const url = `${serverApi}:5000/api/clients/deleteClientData/${index}`;
  const token = parseData('token')

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Обробка успішного видалення
      console.log(data.message)
      showMessage(data.message + '! ПЕРЕЗАВАНТАЖ СТОРІНКУ!', 5000);
    })
    .catch(error => {
      // Обробка помилки
      console.error('Error deleting offer:', error);
    });
}

export const sendMessageToTelegram = (TOKEN, CHAT_ID, MESSAGE) => {
  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: MESSAGE,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
}

