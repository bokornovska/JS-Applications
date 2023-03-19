import { html } from "../node_modules/lit-html/lit-html.js";

let _visualize;
let _container;
let _notificationsList = [];
let _id = 0;

// this is based on bootstrap -- care it uses custom notification types...

const initialize = (renderFunc, domLocation) => {
  _visualize = renderFunc;
  _container = domLocation;
};

const notificationTemplate = (notifArr) =>
  html`
    ${notifArr.map(
      ({ message, type }) => html`<div class="alert alert-${type}" role="alert">${message}</div>`
    )}
  `;

const createNotification = (message, type = "danger") => {
  let newNotif = { id: _id++, message, type };
  _notificationsList.push(newNotif);

  let allNotif = notificationTemplate(_notificationsList);
  _visualize(allNotif, _container);

  setTimeout(() => {
    _notificationsList = _notificationsList.filter((n) => n.id !== newNotif.id);
    _visualize(notificationTemplate(_notificationsList), _container);
  }, 5000);
};

export default {
  createNotification,
  initialize,
};
