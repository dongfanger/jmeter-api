import { MessageBox, Notification } from "element-ui";

export function isJson(data) {
  return (
    typeof data == "object" && Object.prototype.toString.call(data).toLowerCase() === "[object object]" && !data.length
  );
}

export function isType(type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
}

export function filterNullValue(data) {
  if (isType("Object")(data)) {
    let resultObj = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        resultObj[key] = value;
      }
    });
    return resultObj;
  } else if (isType("Array")(data)) {
    return data.filter(value => value);
  }
}

export function delConfirm(message, confirmCallback, options = {}) {
  const config = Object.assign(
    {},
    {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      confirmButtonClass: "el-button--danger",
      type: "warning",
    },
    options,
  );

  if (isType("Function")(confirmCallback)) {
    MessageBox.confirm(message, "提示", config)
      .then(confirmCallback)
      .catch(() => { });
  } else {
    MessageBox.confirm(message, "提示", config).catch(() => { });
  }
}

export function notifyMessage(message, options = {}) {
  Notification({
    title: "提示",
    type: "error",
    message,
    ...options,
  });
}

export function onResponse({ status, statusText, data }, callback) {
  if ([200, 201, 204].includes(status)) {
    callback(data);
  } else {
    Notification({
      title: "提示",
      type: "error",
      message: `${status} ${statusText}`,
    });
  }
}